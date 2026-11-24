import httpx
import re
from datetime import datetime
from sqlalchemy import select
from app.db.session import AsyncSessionLocal
from app.models.document import Document
from app.models.workspace_connection import WorkspaceConnection

class NotionService:
    def extract_rich_text(self, rich_text_list: list) -> str:
        """Extract and format rich text array into Markdown with inline styles."""
        if not rich_text_list:
            return ""
        result = []
        for t in rich_text_list:
            plain = t.get("plain_text", "")
            if not plain:
                continue
            annotations = t.get("annotations", {})
            href = t.get("href")
            
            text = plain
            if annotations.get("code"):
                text = f"`{text}`"
            if annotations.get("bold") and annotations.get("italic"):
                text = f"***{text}***"
            elif annotations.get("bold"):
                text = f"**{text}**"
            elif annotations.get("italic"):
                text = f"*{text}*"
            if annotations.get("strikethrough"):
                text = f"~~{text}~~"
                
            if href:
                text = f"[{text}]({href})"
                
            result.append(text)
        return "".join(result)

    def render_table(self, table_row_blocks: list, has_column_header: bool = True) -> str:
        """Convert a list of table_row blocks into a valid Markdown table."""
        if not table_row_blocks:
            return ""
            
        rows = []
        max_cols = 0
        
        for block in table_row_blocks:
            if block.get("type") != "table_row":
                continue
            cells = block.get("table_row", {}).get("cells", [])
            row_cells = []
            for cell in cells:
                cell_text = self.extract_rich_text(cell).replace("\n", " ").replace("|", "\\|").strip()
                row_cells.append(cell_text)
            max_cols = max(max_cols, len(row_cells))
            rows.append(row_cells)
            
        if not rows or max_cols == 0:
            return ""
            
        for row in rows:
            while len(row) < max_cols:
                row.append("")
                
        lines = []
        header = rows[0]
        lines.append("| " + " | ".join(header) + " |")
        lines.append("| " + " | ".join(["---"] * max_cols) + " |")
        
        start_idx = 1 if has_column_header else 0
        for row in rows[start_idx:]:
            lines.append("| " + " | ".join(row) + " |")
            
        return "\n".join(lines)

    async def query_child_database(self, client: httpx.AsyncClient, database_id: str, headers: dict) -> str:
        """Query and format rows inside an inline or linked child database."""
        try:
            url = f"https://api.notion.com/v1/databases/{database_id}/query"
            resp = await client.post(url, json={"page_size": 50}, headers=headers)
            if resp.status_code != 200:
                return ""
            data = resp.json()
            rows = data.get("results", [])
            if not rows:
                return ""
                
            items = []
            for item in rows:
                props = item.get("properties", {})
                title_val = "Untitled"
                details = []
                for prop_name, prop_data in props.items():
                    p_type = prop_data.get("type")
                    if p_type == "title":
                        title_val = self.extract_rich_text(prop_data.get("title", [])) or "Untitled"
                    elif p_type == "rich_text":
                        val = self.extract_rich_text(prop_data.get("rich_text", []))
                        if val:
                            details.append(f"{prop_name}: {val}")
                    elif p_type == "select":
                        select_obj = prop_data.get("select")
                        if select_obj:
                            details.append(f"{prop_name}: {select_obj.get('name', '')}")
                    elif p_type == "multi_select":
                        ms = prop_data.get("multi_select", [])
                        names = [x.get("name", "") for x in ms if x.get("name")]
                        if names:
                            details.append(f"{prop_name}: {', '.join(names)}")
                    elif p_type == "status":
                        status_obj = prop_data.get("status")
                        if status_obj:
                            details.append(f"{prop_name}: {status_obj.get('name', '')}")
                    elif p_type == "checkbox":
                        checked = prop_data.get("checkbox", False)
                        details.append(f"{prop_name}: {'Yes' if checked else 'No'}")
                    elif p_type == "date":
                        date_obj = prop_data.get("date")
                        if date_obj and date_obj.get("start"):
                            details.append(f"{prop_name}: {date_obj.get('start')}")
                
                detail_str = f" ({'; '.join(details)})" if details else ""
                items.append(f"- **{title_val}**{detail_str}")
                
            return "\n".join(items)
        except Exception as e:
            print(f"Error querying child database {database_id}: {e}")
            return ""

    async def get_block_children(self, client: httpx.AsyncClient, block_id: str, headers: dict) -> list:
        """Fetch all child blocks for a given block with cursor pagination."""
        url = f"https://api.notion.com/v1/blocks/{block_id}/children?page_size=100"
        children = []
        has_more = True
        start_cursor = None
        
        while has_more:
            req_url = url
            if start_cursor:
                req_url += f"&start_cursor={start_cursor}"
                
            try:
                resp = await client.get(req_url, headers=headers)
                if resp.status_code != 200:
                    print(f"Failed to fetch children for block {block_id}: HTTP {resp.status_code}")
                    break
                    
                res_data = resp.json()
                results = res_data.get("results", [])
                children.extend(results)
                
                has_more = res_data.get("has_more", False)
                start_cursor = res_data.get("next_cursor")
            except Exception as e:
                print(f"Error fetching block children for {block_id}: {e}")
                break
                
        return children

    async def parse_blocks(
        self,
        client: httpx.AsyncClient,
        blocks: list,
        headers: dict,
        indent: int = 0,
        depth: int = 0
    ) -> str:
        """Recursively parse Notion blocks into structured Markdown."""
        if depth > 10:
            return ""
            
        markdown = ""
        prefix = "  " * indent
        
        for block in blocks:
            b_type = block.get("type")
            if not b_type:
                continue
                
            data = block.get(b_type, {})
            has_children = block.get("has_children", False)
            block_id = block.get("id")
            
            rich_text = data.get("rich_text", [])
            text = self.extract_rich_text(rich_text)
            
            if b_type == "paragraph":
                markdown += f"{prefix}{text}\n\n" if text.strip() else "\n"
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent + 1, depth=depth + 1)
                    
            elif b_type == "heading_1":
                markdown += f"\n# {text}\n\n"
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent, depth=depth + 1)
                    
            elif b_type == "heading_2":
                markdown += f"\n## {text}\n\n"
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent, depth=depth + 1)
                    
            elif b_type == "heading_3":
                markdown += f"\n### {text}\n\n"
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent, depth=depth + 1)
                    
            elif b_type == "bulleted_list_item":
                markdown += f"{prefix}* {text}\n"
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent + 1, depth=depth + 1)
                    
            elif b_type == "numbered_list_item":
                markdown += f"{prefix}1. {text}\n"
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent + 1, depth=depth + 1)
                    
            elif b_type == "to_do":
                checked = data.get("checked", False)
                checkbox = "[x]" if checked else "[ ]"
                markdown += f"{prefix}- {checkbox} {text}\n"
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent + 1, depth=depth + 1)
                    
            elif b_type == "toggle":
                # Dropdown / toggle block
                toggle_title = text if text.strip() else "Toggle"
                children_md = ""
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    children_md = await self.parse_blocks(client, children, headers, indent=indent, depth=depth + 1)
                markdown += f"\n<details open>\n<summary><b>{toggle_title}</b></summary>\n\n{children_md}\n</details>\n\n"
                
            elif b_type == "table":
                # Tables have table_row child blocks
                has_column_header = data.get("has_column_header", True)
                if has_children:
                    table_rows = await self.get_block_children(client, block_id, headers)
                    table_md = self.render_table(table_rows, has_column_header)
                    markdown += f"\n{table_md}\n\n"
                    
            elif b_type == "callout":
                icon_data = data.get("icon", {})
                icon_str = ""
                if icon_data.get("type") == "emoji":
                    icon_str = f"{icon_data.get('emoji', '💡')} "
                elif icon_data.get("type") == "external":
                    icon_str = "💡 "
                callout_title = f"{icon_str}{text}".strip()
                callout_children_md = ""
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    callout_children_md = await self.parse_blocks(client, children, headers, indent=indent + 1, depth=depth + 1)
                markdown += f"\n> {callout_title}\n"
                if callout_children_md:
                    for line in callout_children_md.splitlines():
                        markdown += f"> {line}\n" if line.strip() else ">\n"
                markdown += "\n"
                
            elif b_type == "quote":
                markdown += f"\n> {text}\n"
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    quote_children_md = await self.parse_blocks(client, children, headers, indent=indent + 1, depth=depth + 1)
                    for line in quote_children_md.splitlines():
                        markdown += f"> {line}\n" if line.strip() else ">\n"
                markdown += "\n"
                
            elif b_type == "code":
                lang = data.get("language", "text")
                markdown += f"\n```{lang}\n{text}\n```\n\n"
                
            elif b_type == "divider":
                markdown += "\n---\n\n"
                
            elif b_type in ["column_list", "column"]:
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent, depth=depth + 1)
                    
            elif b_type == "synced_block":
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent, depth=depth + 1)
                    
            elif b_type == "bookmark":
                b_url = data.get("url", "")
                caption = self.extract_rich_text(data.get("caption", []))
                label = caption if caption.strip() else b_url
                markdown += f"\n[Bookmark: {label}]({b_url})\n\n"
                
            elif b_type in ["image", "file", "pdf", "video"]:
                caption = self.extract_rich_text(data.get("caption", []))
                f_url = data.get("file", {}).get("url") or data.get("external", {}).get("url", "")
                if b_type == "image":
                    markdown += f"\n![{caption or 'Image'}]({f_url})\n\n"
                else:
                    markdown += f"\n[{caption or b_type.capitalize()}]({f_url})\n\n"
                    
            elif b_type == "child_page":
                p_title = data.get("title", "Untitled Sub-page")
                markdown += f"\n📄 **Sub-page: {p_title}**\n\n"
                
            elif b_type == "child_database":
                db_title = data.get("title", "Database")
                markdown += f"\n📊 **Database: {db_title}**\n\n"
                db_md = await self.query_child_database(client, block_id, headers)
                if db_md:
                    markdown += f"{db_md}\n\n"
                    
            else:
                if text:
                    markdown += f"{prefix}{text}\n\n"
                if has_children:
                    children = await self.get_block_children(client, block_id, headers)
                    markdown += await self.parse_blocks(client, children, headers, indent=indent, depth=depth + 1)
                    
        return markdown

    async def get_page_content(self, page_id: str, access_token: str) -> str:
        """Fetch all blocks for a page recursively and convert them into clean Markdown."""
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Notion-Version": "2022-06-28"
        }
        
        async with httpx.AsyncClient(timeout=45.0) as client:
            try:
                top_blocks = await self.get_block_children(client, page_id, headers)
                markdown_content = await self.parse_blocks(client, top_blocks, headers)
                return markdown_content.strip()
            except Exception as e:
                print(f"Error fetching page content for {page_id}: {e}")
                return ""

    async def sync_notion(self, user_id: int, project_id: int, access_token: str):
        print(f"Starting Notion sync for user {user_id}")
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Notion-Version": "2022-06-28"
        }
        
        search_url = "https://api.notion.com/v1/search"
        search_body = {
            "filter": {
                "value": "page",
                "property": "object"
            },
            "page_size": 100
        }
        
        pages = []
        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                resp = await client.post(search_url, json=search_body, headers=headers)
                resp.raise_for_status()
                data = resp.json()
                pages = data.get("results", [])
            except Exception as e:
                print(f"Notion search failed: {e}")
                return

        print(f"Found {len(pages)} pages in Notion for user {user_id}")
        
        for page in pages:
            page_id = page.get("id")
            properties = page.get("properties", {})
            title = "Untitled Notion Page"
            
            for prop_name, prop_val in properties.items():
                if prop_val.get("type") == "title":
                    title_list = prop_val.get("title", [])
                    title = self.extract_rich_text(title_list) or "Untitled Notion Page"
                    break
            
            content = await self.get_page_content(page_id, access_token)
            
            if not content.strip():
                print(f"Skipping empty page: {title} ({page_id})")
                continue
                
            notion_url = page.get("url") or f"https://notion.so/{page_id.replace('-', '')}"
            
            async with AsyncSessionLocal() as db:
                stmt = select(Document).where(
                    Document.user_id == user_id,
                    Document.source == notion_url
                )
                result = await db.execute(stmt)
                doc = result.scalars().first()
                
                if doc:
                    doc.title = title
                    doc.content = content
                    doc.updated_at = datetime.utcnow()
                    mode = "replace"
                else:
                    doc = Document(
                        user_id=user_id,
                        project_id=project_id,
                        title=title,
                        content=content,
                        source=notion_url,
                        file_type="md",
                        doc_type="file",
                        tags=["notion", "sync"]
                    )
                    db.add(doc)
                    mode = "append"
                    
                await db.commit()
                await db.refresh(doc)
                
            from app.worker import ingest_memory_task
            ingest_memory_task.delay(
                memory_id=doc.id,
                user_id=user_id,
                content=content,
                title=title,
                tags=["notion", "sync"],
                source=notion_url,
                doc_type="file",
                mode=mode
            )
            print(f"Queued ingestion for Notion page: {title}")

        async with AsyncSessionLocal() as db:
            stmt = select(WorkspaceConnection).where(
                WorkspaceConnection.user_id == user_id,
                WorkspaceConnection.service == "notion"
            )
            result = await db.execute(stmt)
            conn = result.scalars().first()
            if conn:
                conn.last_synced_at = datetime.utcnow()
                await db.commit()
                
        print(f"Notion sync completed for user {user_id}")

notion_service = NotionService()
