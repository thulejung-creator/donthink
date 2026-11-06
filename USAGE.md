# donthink V1.1

Use donthink for implementation, debugging, refactoring, and code review.

> Use $donthink to complete this change. Use an independent subagent in the current environment for review.

At the start of a new task, choose an in-environment reviewer or an external model such as DeepSeek. That choice stays with the task. The main agent implements, verifies review findings, and delivers the result.

## In-environment reviewer

Install `agents/donthink-reviewer.toml` under `~/.codex/agents/` for named-agent support. The workflow can also pass its instructions to a generic subagent when the host exposes that capability.

## External reviewer

Requires Node.js 20 or newer. Configure the provider's model, HTTPS base URL, and local key environment variable. Prepare a UTF-8 packet with requirements, relevant code, and test evidence. Confirm the transmission scope before sending.

Preview locally:

```sh
node scripts/external-review.mjs --input packet.txt --base-url https://api.deepseek.com --model YOUR_MODEL_ID --key-env DEEPSEEK_API_KEY --out review.json
```

Append `--send` to submit. Use a new output filename for each review. The adapter supports non-streaming Chat Completions-compatible APIs.

Run local mock tests:

```sh
node --test scripts/external-review.test.mjs
```

See [README.md](README.md) for installation, examples, configuration, and validation status.
