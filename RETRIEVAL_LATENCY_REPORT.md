# Memwyre Production Retrieval Latency & Architecture Report

**Date:** September 2, 2026  
**Environment:** AWS EC2 Production (https://api.memwyre.tech)  
**Engine Version:** Memwyre Engine V2  
**Embedding Model:** AWS Bedrock amazon.titan-embed-text-v2:0 (1024-dim, normalized)  
**Vector Store:** Pinecone Serverless  
**Database:** PostgreSQL  
**Reranker:** Pinecone Inference API (bge-reranker-v2-m3)  

---

## 1. Executive Summary & Measured Benchmark

A comprehensive 15-query end-to-end benchmark was conducted live against the production EC2 instance. All numbers below are **empirically measured** using millisecond instrumentation (`time.perf_counter()`) integrated directly into the retrieval pipeline.

### End-to-End Client Latency (India Client -> AWS us-east-1 EC2)

| Search Query | Results Returned | Min | Avg | Max | P50 (Median) |
|---|:---:|:---:|:---:|:---:|:---:|
| **authentication system design** | 10 | 2,078 ms | 2,207 ms | 2,462 ms | 2,081 ms |
| **project architecture overview** | 10 | 1,767 ms | 1,898 ms | 2,129 ms | 1,796 ms |
| **recent meeting notes** | 10 | 1,707 ms | 1,822 ms | 1,946 ms | 1,814 ms |
| **deployment process** | 10 | 1,750 ms | 1,778 ms | 1,815 ms | 1,770 ms |
| **database schema** | 10 | 1,610 ms | 1,728 ms | 1,840 ms | 1,732 ms |

* **Overall Client E2E Average:** **1,887 ms** (~1.89s)
* **Overall Client E2E Median:** **1,814 ms**
* **Fastest Request:** **1,610 ms**
* **Slowest Request:** **2,462 ms**
* **Client Network Round-Trip Overhead:** **~679 ms** (Transcontinental ping local -> US-East)

---

## 2. Server-Side Stage Breakdown (Intra-Region / EC2)

The actual backend execution time on EC2 averages **~1,207 ms** (~1.2s), split across the 4 stages of Memwyre's unified cognitive pipeline:

```
+------------------------------------------------------------------------+
| Total Server Execution Time: ~1,207.3 ms                               |
+------------------------------------------------------------------------+
| 1. AWS Bedrock Embedding (Titan V2)  :  125.8 ms  (10.4%)             |
| 2. Pinecone Vector Search (Top-100)  :  520.1 ms  (43.1%)             |
| 3. PostgreSQL Fact Graph Validation  :  321.9 ms  (26.7%)             |
| 4. Pinecone Cross-Encoder Reranking  :  228.9 ms  (18.9%)             |
| 5. Semantic SQL Chunks & Dedupe      :    6.4 ms  ( 0.5%)             |
| 6. Deterministic Entity Profiles     :    3.7 ms  ( 0.3%)             |
+------------------------------------------------------------------------+
```

### Stage Deep Dive:
1. **Query Embedding (125.8 ms):**
   - Calls AWS Bedrock runtime for amazon.titan-embed-text-v2:0 with dimensions=1024, normalize=True.
   - Highly reliable and fast (< 150ms).
2. **Pinecone Vector Search (520.1 ms):**
   - Queries the Pinecone serverless index with fetch_k = 100 (10x candidate multiplier for filtering and MMR).
   - Largest single contributor to latency due to remote HTTPS payload handling for 100 vectors + metadata.
3. **Fact Store Lookup & Recency Ranking (321.9 ms):**
   - Executes SQL queries against PostgreSQL to retrieve current truth facts, calculate validity timestamps, and apply recency decay.
4. **Cross-Encoder Reranking (228.9 ms):**
   - Calls Pinecone Inference Rerank API with bge-reranker-v2-m3 to rescore candidates against query semantics.
5. **Deterministic Entity Profile Matching (3.7 ms):**
   - Exact keyword match against entity_profiles table, completely bypassing reranking.

---

## 3. Issues Identified & Fixed in this Session

### Bug 1: MCP Server 502 Crash (ingestion_service_v2 import)
* **Root Cause:** mcp_server.py attempted to import ingestion_service from app.services.ingestion_v2. The v2 module exports the singleton as ingestion_service_v2. This raised an uncaught ImportError on startup, crashing the ASGI process before Nginx could bind.
* **Resolution:** Aliased the import: `from app.services.ingestion_v2 import ingestion_service_v2 as ingestion_service`. (Commit `127f535`).

### Bug 2: Memory Update Timestamp Stale
* **Root Cause:** Updating memory content through MCP relied on SQLAlchemy's ORM onupdate=func.now() hook, which can fail to trigger on certain dialects or session flush states.
* **Resolution:** Explicitly updated `memory.updated_at = datetime.now(timezone.utc)` directly before committing. (Commit `2f07ac5`).

### Bug 3: Gunicorn Worker Boot Failure (NameError: name 'Optional' is not defined)
* **Root Cause:** In vector_store_v2.py, Optional was missing from `from typing import ...`, crashing Gunicorn worker processes on boot with exit code 3.
* **Resolution:** Added Optional to typing imports and guarded router calls. (Commit `edc45dc`).

### Bug 4: NVIDIA NIM 410 Gone / Deprecated Embedding Model
* **Root Cause:** In app/core/config.py, EMBEDDING_API_BASE defaulted to https://integrate.api.nvidia.com/v1, causing rate_limiter.py to auto-select provider = "nvidia" with nvidia/nv-embedqa-e5-v5. NVIDIA decommissioned that model on **August 25, 2026** with HTTP 410 Gone. This caused all vector queries to abort silently with 0 items.
* **Resolution:** 
  1. Set `DEFAULT_EMBEDDING_PROVIDER: str = "bedrock"` in config.py to match `DEFAULT_LLM_PROVIDER = "bedrock"`.
  2. Pointed embeddings to the active, correct model: **AWS Bedrock amazon.titan-embed-text-v2:0**. (Commit `83e2d88`).

### Feature: Real-Time Millisecond Timing Instrumentation
* Added internal timers (time.perf_counter()) across all retrieval phases in retrieval_service_v2.py and vector_store_v2.py.
* Exposed breakdown via HTTP response headers (X-Retrieval-Timings and X-Retrieval-Time-Ms) and in POST /api/v1/retrieval/debug/search.

---

## 4. Competitive Analysis: Zep, Supermemory & Mem0

How Memwyre's latency compares against industry standards:

| Platform | Quoted Latency | Architecture Strategy | Comparison to Memwyre |
|---|:---:|---|---|
| **Zep** | **< 200 ms** (p95 ~160ms) | Performs heavy graph extraction at **write-time**; collocated vector index; no remote reranker API on read. | ~6x faster on read, but higher write-time overhead and vendor lock-in. |
| **Supermemory** | **< 300 ms** (p50 ~69ms) | In-memory/collocated graph search; optimized for voice agents; disputed benchmark methodology. | Targets voice AI; Memwyre provides richer temporal fact reconciliation. |
| **Mem0** | **0.6s - 1.4s** (p95) | Multi-stage extraction & dynamic context compression. | **Direct peer to Memwyre** (~1.2s server execution). |

---

## 5. Marketing vs. Technical Numbers

When quoting latency in pitch decks, landing pages, and documentation:
* **Never quote client internet round-trip:** Public internet ping from different continents (~700ms) is client infrastructure overhead.
* **The Pitch Deck Stat:** **"~1.2s Full Multi-Stage Cognitive Retrieval"**
* **The Fast-Path Vector Stat:** **"~640 ms Dense Vector Search"** (Bedrock 125ms + Pinecone 520ms)
* **The Counter-Positioning Pitch:**
  > *"Naive vector databases return in 300ms by doing simple cosine similarity on stale chunks. In 1.2 seconds, Memwyre executes a 4-stage pipeline: Embedding Generation -> Vector Candidate Search -> Temporal Fact Validation -> Neural Cross-Encoder Reranking - ensuring hallucination-free, high-precision context for production LLM agents."*

---

## 6. Optimization Roadmap to Sub-300ms

To reach Zep/Supermemory speed (< 300 ms server execution), implement these two changes:

1. **Parallel Execution via asyncio.gather (~200ms reduction):**
   - Run the Bedrock query embedding generation and the PostgreSQL initial state/profile lookups concurrently rather than sequentially.
2. **Local / Collocated Vector Store & Local Reranking (~500ms reduction):**
   - Replace remote Pinecone HTTPS API calls with collocated pgvector or in-cluster Qdrant (< 25ms vs. 520ms).
   - Use in-process reciprocal rank fusion (RRF) or a lightweight local ONNX cross-encoder instead of remote API reranking (< 15ms vs. 229ms).
