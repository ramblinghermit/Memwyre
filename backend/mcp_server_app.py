from mcp_server import mcp
from starlette.responses import JSONResponse
from starlette.types import Receive, Scope, Send

base_app = mcp.streamable_http_app()


async def app(scope: Scope, receive: Receive, send: Send) -> None:
    if scope["type"] == "http":
        path = scope.get("path", "")
        method = scope.get("method", "")

        # Dedicated health check endpoints
        if path in ("/health", "/ping", "/mcp/health", "/mcp/ping"):
            response = JSONResponse({"status": "healthy", "service": "memwyre-mcp"})
            await response(scope, receive, send)
            return

        # Plain GET requests without text/event-stream (health checkers / browsers)
        if method == "GET":
            headers = dict(scope.get("headers", []))
            accept = headers.get(b"accept", b"").decode("latin1", errors="ignore").lower()
            if "text/event-stream" not in accept:
                response = JSONResponse({
                    "status": "healthy",
                    "service": "memwyre-mcp",
                    "transport": "streamable-http",
                    "message": "Memwyre MCP Server is running. Connect via MCP client using POST or SSE with text/event-stream.",
                })
                await response(scope, receive, send)
                return

    await base_app(scope, receive, send)

