# Cross-Bot Shared Knowledge: Persistent Memory for Grok Build

> **TL;DR:** Grok Build agents operate in silos. By installing the Memwyre Grok Plugin, you can enable cross-bot shared memory. When one bot learns a new architecture pattern or project requirement, it saves it to your Memwyre Vault. The next time *any* bot in your fleet runs, it instantly inherits that exact context.

xAI's **Grok Bot** and **Grok Build** platforms have revolutionized how developers build and interact with autonomous agents. They are highly intelligent, uniquely witty, and integrate deeply with your codebase. 

However, as teams scale their agent rosters, a massive inefficiency emerges: **knowledge silos**. If you correct a Grok bot on an API endpoint format during one session, another Grok bot running a separate task has no idea that correction took place. You end up repeating yourself, and your bots drift out of sync with your project's evolving architecture.

Memwyre solves this with **Cross-Bot Shared Memory**.

---

## The Problem: Isolated Agent Lifecycles

By default, when you launch a Grok Bot via the CLI or web interface, its context is strictly limited to:
1. The static files in its immediate workspace.
2. The current conversation history of that specific session.

If Bot A completes a massive refactor and establishes a new error-handling convention, Bot B will still use the old convention tomorrow.

## The Solution: Memwyre's Deterministic Hooks

We built the **Memwyre Grok Plugin** to securely bridge your Grok instances with a persistent, team-wide intelligence layer. Using Grok's native lifecycle hooks, the plugin intercepts the SessionStart and SessionEnd events to inject and ingest memory.

### 1. Instant Context Injection
When a Grok Build session starts, the plugin triggers our inject-memory script. This script reaches out to the Memwyre API, pulls the active architecture patterns, team conventions, and recent codebase learnings, and directly injects them into Grok's system prompt.

### 2. Autonomous Learning 
When the session concludes, the capture-session hook processes the terminal transcript. Instead of just saving a massive text dump, Memwyre uses a lightweight LLM router to extract *actionable insights* (e.g., "The team switched to strict TypeScript interfaces for API responses") and saves them to the shared Vault.

## Getting Started

Installing the Memwyre Grok Plugin requires zero dependencies and only takes a few seconds:

```bash
# 1. Install the CLI tool
npx install-memwyre --grokbot

# 2. Add the plugin
grok plugin install @memwyre/grok-plugin
```

Once your API key is configured, your entire fleet of Grok agents will instantly begin sharing a unified memory graph. When one bot learns, they all learn.
