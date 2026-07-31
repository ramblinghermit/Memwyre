# Claude Code Memwyre Plugin (`@memwyre/claude-code-plugin`)

<p align="center">
  <a href="https://www.npmjs.com/package/@memwyre/claude-code-plugin"><img src="https://img.shields.io/npm/v/@memwyre/claude-code-plugin?style=flat-square&color=ff4d4d&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@memwyre/claude-code-plugin"><img src="https://img.shields.io/npm/dm/@memwyre/claude-code-plugin?style=flat-square&color=00e5cc&label=downloads" alt="npm downloads" /></a>
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="license" /></a>
</p>

Seamless persistent memory and automated session context lifecycle plugin for **Claude Code CLI**, powered by **Memwyre**.

---

## Features

- 🧠 **Automated Context Injection (`SessionStart`)**: Automatically retrieves past project memories and context when you launch Claude Code.
- 💾 **Automated Session Capture (`Stop`)**: Summarizes and captures technical decisions, architecture notes, and facts from your session into your Memwyre Vault.
- 🔒 **Zero Token Overload**: Smart, compact prompt injection payload.

---

## Installation & Setup

1. **Install the plugin**:
   ```bash
   claude plugin install @memwyre/claude-code-plugin
   ```

2. **Set your Memwyre API Key**:
   Set `MEMWYRE_API_KEY` in your environment (e.g. `~/.zshrc`, `~/.bashrc`, or system environment variables):
   ```bash
   export MEMWYRE_API_KEY="bv_sk_your_api_key_here"
   ```

3. **(Optional) Custom Self-Hosted Server URL**:
   By default, the plugin connects to `https://api.memwyre.tech`. If self-hosting Memwyre:
   ```bash
   export MEMWYRE_API_URL="http://localhost:8000"
   ```

---

## How It Works

1. **SessionStart Hook**: When a new Claude Code session starts in a workspace, the plugin queries Memwyre's vector retrieval engine for past memories matching the project directory.
2. **Session Lifecycle**: As you work with Claude Code, context and notes are preserved.
3. **Stop Hook**: When the session ends, the plugin sends session transcripts to Memwyre's background worker to extract structured memories, facts, and code decisions.

---

## License

Licensed under the [Apache-2.0 License](LICENSE).
