---
name: memwyre-status
description: Check Memwyre persistent memory connection status, active user profile, and memory counts for the current workspace. Use when troubleshooting memory injection or verifying credentials.
---

# Memwyre Status Skill

Check the status of your Memwyre integration in Antigravity.

## Instructions

1. Check credentials:
   - Call `memwyre_status` tool if available.
   - Or run the status script:
     ```bash
     node scripts/login.js --test
     ```
2. Report the following to the user:
   - Connection status (Connected / Not Connected)
   - Account email or username
   - Active API Endpoint (default: `https://api.memwyre.tech`)
   - Current project scope name
   - Stored credentials path (`~/.antigravity-memwyre/credentials.json`)
3. If credentials are missing or invalid, guide the user to run:
   ```bash
   node scripts/login.js --api-key <YOUR_API_KEY>
   ```
