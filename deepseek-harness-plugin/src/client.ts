import { MemwyreCredentials } from './credentials.js';

export interface MemoryItem {
  id: string | number;
  content: string;
  created_at?: string;
  title?: string;
  tags?: string[];
  status?: string;
}

export interface ContextResponse {
  project: string;
  memories: MemoryItem[];
}

export interface CapturePayload {
  session_id: string;
  project_name: string;
  cwd: string;
  source: string;
  transcript: unknown[];
}

export class MemwyreClient {
  private credentials: MemwyreCredentials;

  constructor(credentials: MemwyreCredentials) {
    this.credentials = credentials;
  }

  get isAuthenticated(): boolean {
    return Boolean(this.credentials.apiKey && this.credentials.apiKey.startsWith('bv_') || this.credentials.apiKey?.startsWith('mw_'));
  }

  get apiUrl(): string {
    return this.credentials.apiUrl;
  }

  private get authHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Plugin-Source': 'deepseek-harness',
    };
    if (this.credentials.apiKey) {
      headers['Authorization'] = `Bearer ${this.credentials.apiKey}`;
    }
    return headers;
  }

  /**
   * Helper request wrapper using native global fetch
   */
  private async request<T>(
    endpoint: string,
    options: {
      method?: string;
      body?: unknown;
      timeoutMs?: number;
    } = {}
  ): Promise<{ ok: boolean; status: number; data?: T; error?: string }> {
    const url = `${this.credentials.apiUrl}${endpoint}`;
    const timeoutMs = options.timeoutMs ?? 10000;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: this.authHeaders,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const text = await response.text();
      let parsed: unknown = text;
      try {
        parsed = JSON.parse(text);
      } catch {
        // Keep raw string if non-JSON
      }

      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          error: typeof parsed === 'object' && parsed && 'detail' in (parsed as Record<string, unknown>)
            ? String((parsed as Record<string, unknown>).detail)
            : `HTTP ${response.status}: ${text.slice(0, 200)}`,
        };
      }

      return {
        ok: true,
        status: response.status,
        data: parsed as T,
      };
    } catch (err: unknown) {
      clearTimeout(timeout);
      const message = err instanceof Error ? err.message : String(err);
      return {
        ok: false,
        status: 0,
        error: message,
      };
    }
  }

  /**
   * Validate API key and fetch user info
   */
  async validateKey(): Promise<{ ok: boolean; email?: string; username?: string; error?: string }> {
    if (!this.credentials.apiKey) {
      return { ok: false, error: 'No API key configured.' };
    }

    const res = await this.request<{ email?: string; username?: string }>('/api/v1/user/me');
    if (!res.ok) {
      return { ok: false, error: res.error || 'Failed to authenticate key.' };
    }

    return {
      ok: true,
      email: res.data?.email,
      username: res.data?.username,
    };
  }

  /**
   * Fetch memories relevant to a project workspace
   */
  async getProjectContext(projectName: string): Promise<ContextResponse> {
    if (!this.credentials.apiKey) {
      return { project: projectName, memories: [] };
    }

    const encodedProject = encodeURIComponent(projectName);
    const res = await this.request<ContextResponse>(
      `/api/v1/plugin/context?project=${encodedProject}&source=deepseek-harness`
    );

    if (res.ok && res.data) {
      return res.data;
    }

    return { project: projectName, memories: [] };
  }

  /**
   * Asynchronously capture session interactions for background intelligence extraction
   */
  async captureSession(payload: CapturePayload): Promise<{ ok: boolean; message?: string }> {
    if (!this.credentials.apiKey) {
      return { ok: false, message: 'No API key provided' };
    }

    const res = await this.request<{ message?: string }>('/api/v1/plugin/capture', {
      method: 'POST',
      body: payload,
      timeoutMs: 12000,
    });

    return {
      ok: res.ok,
      message: res.data?.message || res.error,
    };
  }

  /**
   * Search memory vault semantically via the MCP HTTP endpoint or search API
   */
  async searchMemories(query: string, workspaceName?: string): Promise<string> {
    if (!this.credentials.apiKey) {
      return 'Error: Memwyre API key not configured. Run "node scripts/login.js" or set MEMWYRE_API_KEY.';
    }

    // Try direct retrieval endpoint first
    const res = await this.request<{ results?: Array<{ content?: string; text?: string }> } | string>(
      '/api/v1/retrieval/search',
      {
        method: 'POST',
        body: {
          query,
          workspace_name: workspaceName,
          top_k: 5,
        },
      }
    );

    if (res.ok && res.data) {
      if (typeof res.data === 'string') return res.data;
      if (Array.isArray(res.data.results)) {
        return res.data.results.map((r) => `- ${r.content || r.text || ''}`).join('\n');
      }
      return JSON.stringify(res.data, null, 2);
    }

    // Fallback to project context search
    const ctx = await this.getProjectContext(workspaceName || 'default');
    if (ctx.memories.length > 0) {
      const filtered = ctx.memories.filter((m) =>
        m.content.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length > 0) {
        return filtered.map((m) => `- ${m.content}`).join('\n');
      }
      return ctx.memories.map((m) => `- ${m.content}`).join('\n');
    }

    return 'No relevant memories found in your Memwyre Vault.';
  }

  /**
   * Save a new memory snippet into Memwyre
   */
  async saveMemory(
    text: string,
    tags?: string[],
    workspaceName?: string
  ): Promise<string> {
    if (!this.credentials.apiKey) {
      return 'Error: Memwyre API key not configured.';
    }

    const res = await this.request<{ id?: string | number; message?: string }>('/api/v1/memory/', {
      method: 'POST',
      body: {
        content: text,
        tags: tags || ['deepseek-harness'],
        source: 'deepseek-harness',
        workspace_name: workspaceName,
      },
    });

    if (res.ok) {
      const id = res.data?.id ? `mem_${res.data.id}` : 'new';
      return `Memory successfully saved to Memwyre Inbox (${id}).`;
    }

    return `Failed to save memory: ${res.error || 'Unknown error'}`;
  }
}
