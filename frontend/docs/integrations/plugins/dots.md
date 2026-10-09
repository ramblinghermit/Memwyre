---
title: "OpenAI Dots"
description: "Connect OpenAI Dots to Memwyre for persistent cross-session memory. Your Dot can search, save, and recall knowledge from your vault using the Memwyre MCP connector."
---

## Overview

OpenAI Dots (announced September 2026) are always-on, persistent AI agents that live inside ChatGPT, Slack, and Teams. Powered by GPT-6 Astra, a Dot can work on tasks in the background — even when you're offline — using its own cloud computer and browser.

However, Dots rely on ChatGPT's native memory system, which is:
- **Consumer-grade**: designed for general preferences, not structured project knowledge
- **Siloed**: not queryable from external tools like Cursor or Claude Code
- **Unstructured**: stores free-form text, not semantic knowledge graphs

The Memwyre MCP connector bridges this gap — giving your Dot access to a **structured, cross-tool memory vault** that syncs with your entire AI developer stack.

## How It Works

Dots connect to external tools via ChatGPT's MCP connector ecosystem. Once you connect Memwyre's MCP server, your Dot can:

- **Search** your memory vault for past decisions, patterns, and conventions
- **Save** important discoveries back to your Memwyre Inbox for later curation
- **List and browse** your recent memories and documents
- **Cross-reference** context from sessions in Claude Code, Cursor, or any other tool connected to the same vault

## Setup

Connecting Memwyre to OpenAI Dots takes under 2 minutes.

### Step 1: Get Your API Key

Generate an API key from **Settings → API Keys** in the [Memwyre web app](https://app.memwyre.tech/settings).

### Step 2: Connect the MCP Server

In ChatGPT:
1. Enable **Developer Mode** in your ChatGPT settings (required for custom MCP connections)
2. Go to **Settings → Connected Apps** (or **Integrations**)
3. Click **+ Add MCP Server**
4. Enter the Memwyre MCP server URL:

```
https://server.memwyre.tech/mcp
```

5. When prompted for authentication, choose **Bearer Token** and enter your API key (`bv_sk_your_api_key_here`)

> **Note for production / multi-user deployments:** OpenAI's production MCP standard requires OAuth 2.1 with PKCE for connected apps serving multiple users. The static Bearer token approach works for personal use. For enterprise rollouts, contact support@memwyre.tech for OAuth integration guidance.

### Step 3: Activate in Your Dot

In your Dot's configuration:
1. Open your Dot's settings
2. Under **Capabilities**, enable **Memwyre** from the connected apps list
3. (Optional) Add a custom instruction: *"When working on code projects, always search Memwyre for relevant past decisions before starting a task."*

### Important: Read-Only Proactive Mode

When your Dot operates in **proactive/background mode** (i.e., working autonomously without active interaction), it runs under a strict **read-only restriction** enforced by OpenAI. This means:

- ✅ Your Dot **can** call `search_memwyre`, `list_memories`, `get_inbox` (read operations)
- ⚠️ Your Dot **will stage** `save_memory`, `update_memory`, `delete_memory` (write operations) and **wait for your explicit approval** before executing them

This is a platform-level safety constraint — it cannot be overridden with Custom Rules.


## Available Memory Tools

Once connected, your Dot has access to the following Memwyre tools:

| Tool | Description |
|------|-------------|
| `search_memwyre` | Semantic search across your saved memories, documents, and notes |
| `save_memory` | Save a new memory snippet to your Memwyre Vault |
| `list_memories` | List recent memories and documents |
| `get_document` | Retrieve the full content of a specific document by ID |
| `get_inbox` | Get list of pending memories awaiting your review |
| `update_memory` | Update the content of an existing memory |
| `delete_memory` | Delete a memory or document by ID |
| `search_by_date` | Find memories created within a specific date range |
| `get_all_tags` | Get a list of all tags used in your knowledge base |
| `generate_prompt` | Generate a prompt with retrieved context from your memories |

## Example Prompts for Your Dot

Once connected, you can give your Dot instructions like:

> "Before starting any new code task, search Memwyre for existing architecture decisions related to the project."

> "After completing each research session, save a summary of key findings to my Memwyre vault."

> "When I ask about API design, always check Memwyre for our agreed conventions first."

## Privacy & Security

The Memwyre MCP server communicates via TLS 1.3 (HTTPS). Your API key is stored only in ChatGPT's connected apps configuration and is never stored on the Memwyre MCP server itself — it is sent as a Bearer token with each request.

All memory data is encrypted at rest with AES-256. See [memwyre.tech/privacy-policy](https://memwyre.tech/privacy-policy) for full details.

## Frequently Asked Questions

**Does this replace ChatGPT's built-in memory?**  
No — ChatGPT memory and Memwyre serve different purposes. ChatGPT memory stores personal preferences and conversational context. Memwyre stores structured project knowledge, code decisions, and technical context that syncs across your entire developer toolchain.

**Can my Dot write to Memwyre automatically?**  
Yes. You can instruct your Dot to call `save_memory` automatically when it discovers something important. Memories are saved to your Inbox for your review before being permanently indexed.

**Does this work with multiple Dots?**  
Yes. All Dots connected to the same Memwyre vault share the same memory pool, enabling true cross-agent knowledge sharing.
