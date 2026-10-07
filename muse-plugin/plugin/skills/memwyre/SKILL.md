---
name: memwyre
version: 1.0.0
description: Persistent memory skills for Memwyre — index codebases, check connection status, and manage credentials.
author: Memwyre
category: memory
type: command
keywords:
  - memory
  - context
  - persistent
  - memwyre
  - vault
---

# Memwyre Memory Skills

These skills give you manual control over Memwyre memory operations inside your Muse session.

## Available Commands

- `/memwyre:index` — Index this codebase's architecture, patterns, and key files into your Memwyre vault
- `/memwyre:status` — Show connection status, active project tag, and recent memory count
- `/memwyre:logout` — Clear stored Memwyre credentials from this machine

## Usage

When you use one of these commands in a Muse session, the agent will execute the corresponding memory operation and confirm the result.

### /memwyre:index

Tell the agent to analyze the current project and store key architectural facts, patterns, and conventions as memories.

Example prompt after typing `/memwyre:index`:
> Analyze the project structure, identify the main components, tech stack, key APIs, and coding conventions. Save each as a distinct memory to Memwyre.

### /memwyre:status

Tell the agent to check your Memwyre connection and report how many memories exist for this project.

Example prompt after typing `/memwyre:status`:
> Check the Memwyre credentials file at ~/.muse-memwyre/credentials.json. Report the API URL, key prefix, and approximate memory count for this project.

### /memwyre:logout

Tell the agent to clear your stored Memwyre credentials.

Example prompt after typing `/memwyre:logout`:
> Delete the file ~/.muse-memwyre/credentials.json to remove Memwyre credentials from this machine.
