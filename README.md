# donthink!

### Fewer tokens. Faster delivery. Leaner projects.

**Cut the repeated reasoning, blind retries, and unnecessary implementation that slow Codex down.**

Give Codex a goal. donthink helps it take the shortest reliable path: reuse working solutions, run deterministic checks with tools, debug from evidence, and deliver the changes that matter.

Built around three goals: **reduce token consumption, accelerate progress, and remove unnecessary work from your development process and implementation.**

**V1.1 — Stable release** · Features · Bug fixes · Refactoring · Code review

[Quick start](#quick-start) · [Workflow](#from-request-to-delivery) · [Review options](#give-your-code-a-second-pair-of-eyes) · [Installation](#installation) · [External models](#connect-deepseek-or-another-external-model)

## Make every token move the project forward

### Save tokens: stop paying for repeated work

Let programs handle counts, format checks, calculations, and batch operations. Reuse requirements, project constraints, and existing tools. Resolve what can be resolved once, so the model spends less effort guessing, reanalyzing, and regenerating the same work.

**Calculate with tools. Reuse what works. Ask for the missing information once.**

### Move faster: shorten the path from problem to proof

Define success before implementation. Reproduce failures before fixing them. When an approach fails, use new evidence to choose the next step. Keep each iteration focused on a concrete problem, reducing blind experimentation and rework.

**Let tools do the repetitive work. Make each attempt produce useful evidence.**

### Stay lean: trim redundant steps and code

Start with capabilities already in the project. Choose the smallest change that satisfies the task. Handle simple tasks directly and organize complex work around real dependencies. Use research, scripts, and review where they serve the task.

Within the requested scope, favor shared logic over duplication, existing dependencies over new layers, and targeted changes over unnecessary rewrites. Verify that the intended behavior is preserved.

**Reach the same goal with fewer repeated steps and fewer repeated implementations.**

## Where the savings come from

You know the cycle: explain the requirement again, rewrite the code again, try another guess at the same error, then ask, “Did you test it?”

donthink turns those friction points into actionable rules.

| Source of wasted effort | What donthink does |
| --- | --- |
| Vague requirements and repeated clarification | Defines deliverables, acceptance criteria, and constraints; reuses existing answers |
| Long reasoning for deterministic checks | Uses programs, tests, and established tools to calculate and verify |
| Reinventing existing functionality | Reuses project code and makes necessary changes |
| Repeated guesses at the same failure | Reproduces the issue, tests an explanation, and changes direction using evidence |
| Applying an incompatible workaround | Checks actual versions against official documentation and maintainer findings |
| Missed edge cases that cause rework | Uses tests and independent review to find concrete problems |

**Reserve judgment for decisions that need it. Give repetitive work to reliable tools.**

## Quick start

After installation, describe your coding task naturally:

> Fix the login error in this project. Check successful login and incorrect passwords, and preserve the existing API format.

donthink supports automatic skill selection by the host application. You can also invoke it explicitly:

> Use $donthink to fix this login error. Use an independent subagent in the current environment for review.

At task startup, it asks:

> Should this task use an independent subagent in the current environment, or an external model such as DeepSeek for review?

Choose once for the task. Follow-up work keeps that choice. If your request already specifies the review route, execution proceeds directly.

## From request to delivery

```text
State the goal
    ↓
Choose the review route
    ↓
Read the project and define success
    ↓
Reuse tools and implement the change
    ↓
Run checks and verify behavior
    ↓
Review independently and resolve findings
    ↓
Deliver the changes and verification results
```

### 1. Define done

Turn “improve this” into an actionable task: what changes, what stays, and what demonstrates success. Reuse information already in the project and ask about gaps that affect execution.

### 2. Build on what exists

Inspect existing implementations, tests, and tools first. Research version-specific behavior when needed. Use programs for repeatable checks.

### 3. Learn from every failure

Reproduce the problem, test the suspected cause, and rerun the original failing case after the fix. Use new evidence to choose a different approach when necessary.

### 4. Turn review into verified improvements

Give the reviewer the requirements, relevant code, and test evidence. The main agent verifies findings, fixes confirmed issues, and completes acceptance checks.

## Give your code a second pair of eyes

The main agent implements. An independent reviewer looks for defects. Choose the right collaborator for each task.

| | In-environment subagent | DeepSeek or another external model |
| --- | --- | --- |
| How it works | Uses the current application's subagent capability | Submits review material to a model API |
| Setup | An environment with subagent support | Service URL, model name, and a locally configured API key |
| Review input | Requirements, relevant code, changes, and verification evidence | The review material you authorize for transmission |
| Best fit | Starting with your existing environment | Adding another provider's perspective |

### In-environment review

The included `donthink-reviewer` role focuses on correctness, behavior changes, and acceptance gaps. Findings identify the location, triggering conditions, impact, and a way to verify the issue.

Environments supporting named agents can use the role directly. Environments exposing a generic subagent tool can pass the role instructions to that agent. Model settings and permissions follow the current environment.

### External review

The included adapter supports DeepSeek and services implementing the **Chat Completions-compatible API**. Configure the service, model, and local key to use the same review workflow.

Before submission, the main agent prepares the relevant material and explains the destination and scope. After you authorize that scope, it submits the packet and evaluates the returned findings.

## Ready-to-use requests

### Build a feature

> Use $donthink to add pagination to the order list, with 20 items per page. Preserve the existing API format. Check the first page, last page, and empty list. Use an in-environment subagent for review.

### Fix a bug

> Use $donthink to fix the file-upload error. Reproduce it first, inspect file-size and format handling, and rerun the failing case after the fix.

### Refactor existing code

> Use $donthink to consolidate this duplicated logic while preserving public behavior. Verify it with the existing tests and use an in-environment subagent for review.

### Bring in an external reviewer

> Use $donthink to complete this change, then have DeepSeek review it. Prepare the code and test evidence for me to confirm before sending.

## Installation

### 1. Install the skill

Download the [V1.1 release](https://github.com/thulejung-creator/donthink/releases/tag/v1.1) and place its contents in your personal skill directory:

```text
~/.codex/skills/donthink/
```

`~` is your user directory. On Windows, for example:

```text
C:\Users\YourName\.codex\skills\donthink\
```

If you use a custom `CODEX_HOME`, use its `skills/donthink/` directory. Ensure `SKILL.md` is directly inside `donthink/`. Back up an existing installation before replacing its files.

### 2. Install the reviewer role

Copy `agents/donthink-reviewer.toml` from the package to:

```text
~/.codex/agents/donthink-reviewer.toml
```

For a project-specific role, place it in that project's `.codex/agents/` directory instead.

### 3. Start a task

In a session that has discovered the skill, enter:

> Use $donthink for this change, with an independent subagent in the current environment for review.

Automatic selection is managed by the host application's skill discovery. If the new skill is not visible yet, check the installation in a new session.

## Connect DeepSeek or another external model

The main agent can prepare review material and run the adapter for you. The steps below also support manual setup and troubleshooting.

**Requires Node.js 20 or newer. Uses built-in modules, with no additional npm dependencies.**

Run the commands below from the `donthink` directory.

### Step 1: Prepare a review packet

Create a UTF-8 text file named `packet.txt` containing actual requirements, code, and verification evidence:

```text
Task: Fix the error when the list is empty.
Acceptance: Empty lists render correctly; non-empty behavior stays the same.
Constraints: Preserve the existing API format.
Relevant code: Include the changed code and necessary surrounding context.
Verification: Include checks run, their results, and pending checks.
```

The adapter reads the specified file. Packets must contain nonblank UTF-8 text and fit within 200,000 bytes. Inspect the contents before sending and retain the information needed for this review.

### Step 2: Preview the request

Replace `YOUR_MODEL_ID` with a model currently available from the provider and accessible to your account:

```sh
node scripts/external-review.mjs --input packet.txt --base-url https://api.deepseek.com --model YOUR_MODEL_ID --key-env DEEPSEEK_API_KEY --out review.json
```

Preview runs locally and shows the destination, model, packet size, and content fingerprint. The fingerprint identifies the material being reviewed; inspect the full text in `packet.txt`.

### Step 3: Submit the review

Set the `DEEPSEEK_API_KEY` environment variable locally for the process running the adapter. Keep the key in your local configuration. After confirming the material to send, append `--send`:

```sh
node scripts/external-review.mjs --input packet.txt --base-url https://api.deepseek.com --model YOUR_MODEL_ID --key-env DEEPSEEK_API_KEY --out review.json --send
```

On success, `review.json` contains the review, packet fingerprint, model details, and usage information when returned by the service. Open it in a text editor or let the main agent evaluate the findings.

Use a new output filename for each review and ensure its parent directory exists.

### Options

| Option | Purpose |
| --- | --- |
| `--input` | Review packet file |
| `--base-url` | HTTPS service base URL |
| `--model` | Provider model identifier |
| `--key-env` | Local API-key environment variable; defaults to `DEEPSEEK_API_KEY` |
| `--out` | Path to a new review result file |
| `--send` | Submit the request; omit for local preview |

The adapter appends `/chat/completions` to the base URL. Include a `/v1` prefix in the base URL when required by your provider's documentation.

## Troubleshooting

| Situation | Next step |
| --- | --- |
| Skill does not activate automatically | Check installation or explicitly invoke `$donthink` |
| Environment has no subagent capability | Choose a configured external review provider |
| Missing API key | Check that the adapter process can read the named environment variable |
| Output file already exists | Choose a new result filename |
| HTTP error | Check account access, model name, permissions, and provider status |
| Timeout or network failure | Check provider-side processing status before deciding to resubmit |
| Truncated or malformed answer | Narrow the review packet and submit again |
| Questionable review finding | Have the main agent verify it against code and actual checks |

The adapter sends one request at a time, with a 120-second timeout and `max_tokens` set to 4096. After a failure, you decide the next action. Focused packets keep reviews easier to assess.

## Validation

Workflow configuration and adapter behavior have been checked. Token and elapsed-time improvements await comparable-task measurement; review overhead counts toward total consumption, with benefits depending on the repeated work and rework avoided.

| Check | Status |
| --- | --- |
| Skill format validation | Passed |
| Local external-adapter mock tests | Passed |
| Independent in-environment implementation review | Completed; no concrete defects found |
| Live external-provider call | Pending API-key configuration and live verification |

Local tests cover preview, missing credentials, result saving, file protection, API failures, malformed answers, and invalid input:

```sh
node --test scripts/external-review.test.mjs
```

Tests use simulated responses and run locally.

## Project structure

```text
donthink/
├── README.md                       Project overview and guide
├── USAGE.md                        Short getting-started guide
├── VERSION                         Release version
├── SKILL.md                        Main-agent workflow
├── agents/
│   ├── openai.yaml                 Display and automatic-selection settings
│   └── donthink-reviewer.toml      Independent reviewer role
├── references/
│   └── review-routing.md           Review routes and execution rules
├── scripts/
│   ├── external-review.mjs         External-model review adapter
│   └── external-review.test.mjs    Local mock tests
└── assets/
    └── icon.svg                    Skill icon
```

## Integration documentation

- [OpenAI: Subagents and custom roles](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [DeepSeek: API setup](https://api-docs.deepseek.com/)
- [GitHub: donthink](https://github.com/thulejung-creator/donthink)

---

**Use $donthink. Spend your tokens on results.**
