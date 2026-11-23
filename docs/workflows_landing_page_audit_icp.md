# Memwyre: Top Workflows, Landing Page Audit & ICP Specification

## 1. Top 10 High-Intent Workflows for Memwyre

### 1. AI Video & Multi-Tool Creative Production (Highest Immediate Monetization)
* **Stack**: Gmail ➔ ChatGPT / Claude ➔ Midjourney / Higgsfield ➔ ElevenLabs.
* **Problem**: Revisions received in Gmail require manual copy-pasting of prompt seeds, camera motions, and voice IDs across 5+ browser tabs. Character and voice inconsistency across scenes ruins client renders.
* **Solution**: Memwyre Chrome Extension acts as a persistent "Project State Envelope" with 1-click prompt and voice insertion across tabs.
* **Pricing**: $49 – $99 / seat / mo.

### 2. Shared Team Context in Cursor & Claude Desktop (Highest B2B Value)
* **Stack**: Cursor Composer, Claude Desktop, VS Code with MCP.
* **Problem**: Engineering teams waste hours re-explaining repo architecture, DB schemas, and PR guidelines to Cursor. Static `.cursorrules` bloat to 5,000+ tokens and contradict each other.
* **Solution**: Team-wide shared memory vault via MCP (`npx -y install-memwyre`). Lead dev updates architecture; all teammates' Cursors inherit it automatically.
* **Pricing**: $99 – $249 / team / mo.

### 3. Multi-Turn AI Customer Support & Sales SDR Agents (Highest Infrastructure TAM)
* **Stack**: LangGraph, CrewAI, OpenAI Assistants, Custom Agent Frameworks.
* **Problem**: Multi-turn amnesia. Dumping raw conversation histories blows up token costs ($2,000+/mo) and spikes latency to 15+ seconds.
* **Solution**: Atomic Subject-Predicate-Object (SPO) extraction + recency decay. Delivers relevant context in 300 tokens instead of 20,000 tokens (73.5% LoCoMo score).
* **Pricing**: $149 – $499 / mo (usage-based).

### 4. Long-Running Autonomous Coding Agents (High Volume + High Retention)
* **Stack**: Claude Code, OpenCode, OpenClaw, Antigravity CLI runners.
* **Problem**: Multi-hour agent refactoring runs out of context mid-session. When the agent restarts, it repeats failed experiments.
* **Solution**: Persists task state, architectural guardrails, and verified bug fixes across agent reboots.
* **Pricing**: $29 – $49 / mo.

### 5. Founder & Executive "Workday Second Brain"
* **Stack**: Gmail + Slack + Zoom/Meet + Claude.
* **Problem**: Critical decisions made in emails and calls are disconnected from AI drafting tools, forcing constant manual re-summarization.
* **Solution**: Syncs directives from email and meeting notes directly into Claude Desktop context via MCP.
* **Pricing**: $20 – $40 / mo.

### 6. Legal & Contract Due Diligence
* **Stack**: Claude / ChatGPT + PDF vault.
* **Problem**: Contract amendments supersede earlier clauses. Standard vector RAG retrieves outdated clauses because semantic similarity ignores chronological precedence.
* **Solution**: Recency decay and conflict resolution automatically deprecates older clauses in favor of newly executed amendments.
* **Pricing**: $199 – $500 / mo.

### 7. Multi-Client Agency Switching
* **Stack**: Marketing, copywriting, and SEO agencies using ChatGPT.
* **Problem**: Brand guidelines bleed into each other. Context from Client A leaks into Client B.
* **Solution**: Project-scoped containerization guarantees strict tenant isolation. Switching projects switches active context instantly.
* **Pricing**: $79 – $149 / agency / mo.

### 8. Spaced-Repetition AI Tutoring & Education
* **Stack**: Language learning bots, technical coding mentors.
* **Problem**: Tutors reset to square one every session, forgetting student mistakes and learning curves.
* **Solution**: Longitudinal student tracking across weeks with dynamic spaced-repetition prompting.
* **Pricing**: $15 – $29 / user / mo.

### 9. Financial Research & Earnings Guidance Tracking
* **Stack**: Financial analyst LLM pipelines parsing 10-Ks and earnings calls.
* **Problem**: Guidance revisions quarter-over-quarter trigger hallucinations in flat vector RAG.
* **Solution**: Temporal alignment benchmark (74.0% accuracy on multi-session time horizons).
* **Pricing**: $99 – $299 / analyst / mo.

### 10. Research & Scientific Literature Synthesis
* **Stack**: Academic and industrial R&D teams.
* **Problem**: Tracking evolving hypotheses and contradictory conclusions across hundreds of papers.
* **Solution**: Factual entity graphs connect claims, datasets, and methodologies across papers.
* **Pricing**: $29 / mo.

---

## 2. Landing Page Evaluation & Immediate Action Plan

### Core Issues & Remediation in `LandingPage.vue`:
1. **Hero Headline Too Abstract**:
   * *Current*: "Your AI should remember conversations, codebases, decisions... Memwyre is the AI Memory Platform..."
   * *Fix*: "Stop re-explaining your context. Memwyre gives Cursor, Claude, and your AI stack persistent, shared memory — with zero token bloat."
2. **High-Friction Hero CTA**:
   * *Current*: Buttons link to `/signup` or copy a raw agent prompt.
   * *Fix*: Put `npx -y install-memwyre` directly on the hero with a one-click "Add to Chrome (Free)" button.
3. **Crucial Explanatory Sections Hidden (`v-if="false"`)**:
   * *Lines 202-375 (`WHAT WE DO`)*: Contains 70.5% LoCoMo accuracy and 81% token reduction metrics.
   * *Lines 516-720 (`Comparison Section` vs Mem0, Supermemory, Zep)*: Hidden.
   * *Lines 828-985 (`How It Works`)*: Hidden.
   * *Fix*: Unhide and polish the 3-step diagram (Capture ➔ Enrich & Prune ➔ Recall via MCP) and the Competitor Comparison table.
4. **Hero Graphic Lacks "Before vs. After"**:
   * *Fix*: Replace abstract dashboard mockup with an interactive split comparison:
     * *Without Memwyre*: AI fails multi-turn recall and burns 15,000 tokens.
     * *With Memwyre*: AI recalls exact project state in 300 tokens.
5. **Elevate LoCoMo Benchmark**:
   * *Fix*: Move the 73.5% LoCoMo benchmark badge to the hero container as primary social proof.

---

## 3. Ideal Customer Profile (ICP) Definition

### Primary Beachhead: The Lead AI Engineer / Founding Engineer
* **Target**: Tech Lead / Founding Engineer at 5–30 person tech startups.
* **Daily Stack**: Cursor Composer, Claude Desktop, VS Code, GitHub (macOS).
* **Burning Pain**: Teammates waste 30 mins/day re-prompting Cursor. Static `.cursorrules` are bloated, contradictory, and out-of-date.
* **Buying Trigger**: Teammate ships broken code due to Cursor hallucinating deprecated internal architecture.
* **Offer**: "One MCP command syncs your team's architecture decisions across everyone's Cursor in real time."
* **Willingness to Pay**: $99 – $199 / team / month on corporate card.

### Secondary Beachhead: The Multi-Tool AI Video Producer
* **Target**: Creative Director / Boutique Agency Owner / AI Filmmaker.
* **Daily Stack**: ChatGPT, Higgsfield, Midjourney, ElevenLabs (macOS / Chrome / Arc).
* **Burning Pain**: Wasting hours re-rendering scenes because client revisions in Gmail were not accurately transferred across Higgsfield prompts and ElevenLabs voice settings.
* **Buying Trigger**: Losing a paying client due to visual and vocal character inconsistency.
* **Offer**: "The browser context sidepanel that keeps character and voice DNA pinned across all your generative video tabs."
* **Willingness to Pay**: $49 – $99 / seat / month.
