from mcp_server import mcp

# Export the FastMCP Streamable HTTP ASGI app for Gunicorn / Uvicorn
app = mcp.streamable_http_app()
