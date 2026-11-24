import os
import logging
from typing import List, Optional, Any
from app.core.config import settings

logger = logging.getLogger(__name__)

class VertexAIClient:
    """
    Universal Vertex AI Client powered by Google's GenAI SDK.
    Reuses Service Account authentication and project setup from Minimi.
    """
    def __init__(self):
        self._client = None
        self._fallback_client = None
        self._initialized = False

    def _get_api_key(self) -> Optional[str]:
        key = os.environ.get("GEMINI_API_KEY") or getattr(settings, "GEMINI_API_KEY", None)
        if key:
            return key
        try:
            minimi_env = os.path.join(os.path.expanduser("~"), "OneDrive", "Documents", "minimi", ".env")
            if os.path.exists(minimi_env):
                with open(minimi_env, "r", encoding="utf-8") as f:
                    for line in f:
                        if line.startswith("GEMINI_API_KEY="):
                            return line.split("=", 1)[1].strip().strip('"').strip("'")
        except Exception:
            pass
        return None

    def get_fallback_client(self):
        if self._fallback_client:
            return self._fallback_client
        key = self._get_api_key()
        if not key:
            return None
        try:
            from google import genai
            self._fallback_client = genai.Client(api_key=key, http_options={"api_version": "v1beta"})
            return self._fallback_client
        except Exception as e:
            logger.warning(f"Failed to create fallback GenAI client: {e}")
            return None

    def _resolve_credentials_path(self) -> Optional[str]:
        # 1. Direct env variable or setting
        env_cred = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS") or getattr(settings, "GOOGLE_APPLICATION_CREDENTIALS", None)
        if env_cred and os.path.exists(env_cred):
            return os.path.abspath(env_cred)

        # 2. Check local backend credentials folder
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        backend_cred = os.path.join(base_dir, "credentials", "gcp-key.json")
        if os.path.exists(backend_cred):
            return backend_cred

        # 3. Check minimi project path as fallback
        user_home = os.path.expanduser("~")
        minimi_cred = os.path.join(user_home, "OneDrive", "Documents", "minimi", "gcp-key.json")
        if os.path.exists(minimi_cred):
            return minimi_cred

        # 4. Check root gcp-key.json
        root_cred = os.path.join(base_dir, "gcp-key.json")
        if os.path.exists(root_cred):
            return root_cred

        return None

    def get_client(self):
        if self._client:
            return self._client

        cred_path = self._resolve_credentials_path()
        if cred_path:
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = cred_path
            logger.info(f"VertexAIClient: Using GCP credentials from {cred_path}")
        else:
            logger.warning("VertexAIClient: No GCP credentials file found. Relying on default GCP environment.")

        try:
            from google import genai
            self._client = genai.Client(
                vertexai=True,
                project=settings.VERTEX_PROJECT,
                location=settings.VERTEX_LOCATION
            )
            self._initialized = True
            return self._client
        except Exception as e:
            logger.error(f"VertexAIClient initialization failed: {e}")
            raise e

    def embed_texts(self, texts: List[str], output_dimensionality: int = 1024, model: Optional[str] = None) -> List[List[float]]:
        """
        Embed a list of text strings using gemini-embedding-001 with explicit dimension (1024).
        """
        if not texts:
            return []

        client = self.get_client()
        from google.genai import types

        model_name = model or settings.VERTEX_EMBEDDING_MODEL
        config = types.EmbedContentConfig(output_dimensionality=output_dimensionality)

        # Batch in chunks of 50 to avoid API payload limits
        batch_size = 50
        all_embeddings = []

        for i in range(0, len(texts), batch_size):
            chunk = texts[i:i + batch_size]
            response = client.models.embed_content(
                model=model_name,
                contents=chunk,
                config=config
            )
            for item in response.embeddings:
                all_embeddings.append(item.values)

        return all_embeddings

    async def aembed_texts(self, texts: List[str], output_dimensionality: int = 1024, model: Optional[str] = None) -> List[List[float]]:
        import asyncio
        return await asyncio.to_thread(self.embed_texts, texts, output_dimensionality, model)

    def generate(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        model: Optional[str] = None,
        temperature: float = 0.7
    ) -> str:
        client = self.get_client()
        from google.genai import types

        model_name = model or settings.VERTEX_MODEL
        config = types.GenerateContentConfig(
            temperature=temperature,
            system_instruction=system_instruction
        )
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=config
            )
            return response.text or ""
        except Exception as e:
            logger.warning(f"Vertex AI generate with {model_name} failed: {e}. Trying fallback client...")
            fallback = self.get_fallback_client()
            if fallback:
                response = fallback.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=config
                )
                return response.text or ""
            raise e

    async def agenerate(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        model: Optional[str] = None,
        temperature: float = 0.7
    ) -> str:
        import asyncio
        return await asyncio.to_thread(self.generate, prompt, system_instruction, model, temperature)

vertex_ai_client = VertexAIClient()

class VertexAIMessageResponse:
    def __init__(self, content: str):
        self.content = content
        self.text = content

class VertexChatLLM:
    """LangChain-compatible ChatModel wrapper for Google Vertex AI."""
    def __init__(self, model: str = "gemini-2.5-flash", temperature: float = 0.7):
        self.model = model
        self.temperature = temperature
        self.client = vertex_ai_client

    def _extract_prompt_and_system(self, messages):
        system_instruction = None
        user_parts = []
        for m in messages:
            content = getattr(m, "content", str(m))
            m_type = getattr(m, "type", "")
            if m_type == "system" or m.__class__.__name__ == "SystemMessage":
                system_instruction = content
            else:
                user_parts.append(content)
        prompt = "\n\n".join(user_parts) if user_parts else ""
        return prompt, system_instruction

    async def ainvoke(self, messages, config=None, **kwargs):
        prompt, system_instruction = self._extract_prompt_and_system(messages)
        text = await self.client.agenerate(
            prompt=prompt,
            system_instruction=system_instruction,
            model=self.model,
            temperature=self.temperature
        )
        return VertexAIMessageResponse(content=text)

    def invoke(self, messages, config=None, **kwargs):
        prompt, system_instruction = self._extract_prompt_and_system(messages)
        text = self.client.generate(
            prompt=prompt,
            system_instruction=system_instruction,
            model=self.model,
            temperature=self.temperature
        )
        return VertexAIMessageResponse(content=text)
