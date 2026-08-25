# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- Individual users: Students, researchers, creators seeking a personal AI brain.
- Tech power users: Developers and AI enthusiasts using Cursor, Claude Desktop, and CLI tools.
- Professional users: Consultants and managers requiring secure knowledge bases for their workflows.

## Product Purpose
Memwyre acts as a centralized, AI-ready personal and professional knowledge storage platform. It securely ingests, chunks, and structures documents, web pages, conversations, and workflows—making them instantly retrievable across an entire AI toolchain. Success means providing perfectly tailored, relevant context to LLMs while massively reducing token consumption.

## Positioning
Unlike siloed memory inside ChatGPT or Claude, Memwyre is a decoupled, universal memory infrastructure. It features dynamic context pruning, an Ebbinghaus-inspired logarithmic decay to gracefully age-out obsolete preferences, and a strict semantic containment system that provides adversarial immunity against hallucinations.

## Operating Context
Users operate across a fragmented AI ecosystem (web chat clients, IDEs like Cursor/VS Code, and desktop apps like Claude). They capture context on the fly via a Chrome extension or CLI and retrieve it directly in their AI tools through the Model Context Protocol (MCP) or OpenClaw plugins.

## Capabilities and Constraints
- Capabilities: File ingestion (PDF, DOCX, TXT, MD), background enrichment (Celery workers), vector storage (Pinecone/ChromaDB), relational state facts (PostgreSQL/SQLite), approval-based memory inbox, and project-scoped containerization.
- Constraints: Must remain model-agnostic. Must comply with data privacy and isolate data across tenants (projects).

## Brand Commitments
Name: Memwyre (AI Brain Vault)

## Evidence on Hand
- System architecture and workflows documented in `README.md` and `ai_brain_vault_srs.md`.
- LoCoMo Benchmark evaluation showing 70.5% overall accuracy with 81% context length reduction.
- Existing codebase structure spanning `backend/` (FastAPI) and `frontend/` (Vue 3 + Tailwind CSS).

## Product Principles
1. **Decoupled and Portable**: Memory belongs to the user, not the LLM provider.
2. **High-Signal, Low-Noise**: Context must be aggressively pruned and temporally aligned.
3. **Seamless Integration**: Ingestion and retrieval should feel native to the user's existing workflow and IDEs.
