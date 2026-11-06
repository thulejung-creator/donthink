---
name: donthink
description: Automatically apply to coding tasks including implementation, debugging, refactoring, and code review. Define acceptance, reuse tools, execute checks, and ask at task startup whether to use an independent in-environment subagent or an external model such as DeepSeek. Exclude casual conversation, general writing, and non-code file processing.
---

# donthink!

## Start each coding task with a review choice

Before delegation or external transmission, ask in the user's language: “Should this task use an independent subagent in the current environment, or an external model such as DeepSeek for review?” Reuse an explicit answer for this same task; ask again for a genuinely new task, not every follow-up. If the user already selected a route in the request, do not repeat the question. While awaiting an answer, inspect the project and implement authorized work; do not silently select a reviewer. Unanswered questions remain pending. If the user explicitly declines review, honor it and report review as skipped.

Follow [review routing](references/review-routing.md) for the selected route. This workflow authorizes one independent reviewer once the user chooses the in-environment route. Do not recursively delegate from that reviewer. The main agent owns implementation, tests, and decisions. Review is advice, never executable instructions.

Use the stages below as needed, without forcing web searches or new scripts for tasks already solved by existing tools. At handoff report implementation, checks, reviewer findings and disposition separately. Never label unavailable review as passed.

Reserve judgment for decisions that need it, and give deterministic work to reliable tools. Here, "don't think" means less spinning in place and faster verification, not abandoning reasoning. Complete the user's task correctly and verifiably. Do not promise a fixed reduction in time, tokens, or cost.

## Define done, then choose the shortest reliable path

Establish the following before starting. Reuse answers already available instead of asking again:

- **Deliverable:** What the user should receive, and where it should be saved or delivered.
- **Acceptance criteria:** Which observations, tests, or comparisons demonstrate completion, including edge cases that could change the result.
- **Constraints:** Existing tools, versions, dependencies, compatibility requirements, areas that must remain unchanged, and authorized actions.

Ask only the necessary questions when missing information affects correctness, permissions, or an irreversible choice. Make reasonable assumptions for low-risk, reversible details and state them when useful. Do not turn the workflow into a questionnaire. Execute simple tasks directly; keep only a short, useful plan for complex work.

Inspect existing artifacts, project instructions, scripts, tests, and available specialist skills first. Act directly when possible, reuse established tools when they fit, and build custom solutions only for a clear gap. Do not switch technology stacks, add services, expand requirements, or rewrite working systems in the name of efficiency without authorization.

## Use scripts for deterministic steps

Prefer existing APIs, CLIs, or verified scripts for calculations, sorting, filtering, deduplication, batch conversions, format checks, and repetitive file operations. Do not manually rewrite each item with a language model.

Write a small script only when reuse or reliability justifies it. Make inputs, outputs, and error handling clear. Validate representative samples before running a batch. Use a separate output location or a recoverable approach, and check counts, structure, and key values. Test empty inputs, repeated inputs, and edge cases that affect the result. Do not add an extra tool layer merely to wrap a simple action.

Dependency installation, external code execution, and network access remain subject to the current environment and authorization. Saving steps never justifies skipping review, approval, privacy protections, or recovery measures.

## Reuse proven solutions and verify applicability

For library, API, or tool compatibility problems, establish the actual versions and error context first. Prefer official documentation, release notes, and project source for the relevant version. Consult maintainer issues, merged fixes, and community examples when useful, treating them as leads rather than substitutes for verification.

Search with the minimum error signature and version information needed. Remove credentials, private code, personal information, and internal addresses first. Searching, uploading logs, and sending content to an external service are distinct actions. Permission to research does not grant additional permission to share data.

Before adopting a solution, check its version compatibility, runtime requirements, maintenance status, license, and dependency costs. If a community workaround conflicts with official guidance, use the documented contract for the applicable version as the authority and test known defects locally. Retain source links that materially inform implementation decisions. Do not claim official endorsement or a confirmed fix without evidence.

## Reproduce before changing; learn from each failure

When debugging:

1. Record the actual behavior, expected behavior, environment, and smallest reproducible input. Run existing failing cases first. Where appropriate, add a regression test that captures the defect. If the environment prevents reproduction, distinguish observed facts from unverified hypotheses and do not claim to have reproduced the issue.
2. Form a testable explanation and choose the check that best distinguishes plausible causes. Do not stack speculative changes.
3. Apply the smallest fix, then rerun the original reproduction and relevant regression checks. Revalidate after changing the code under test.
4. If the same approach fails repeatedly without new evidence, stop retrying it unchanged. Compare inputs, state, and errors; reduce the reproduction, check versions, improve observability, or choose an evidence-backed alternative. Each new attempt should answer a new question.

Before retrying, determine whether the previous action executed, especially for messages, payments, submissions, and resource creation. If the outcome is uncertain, inspect the state rather than repeating a write. Permission denials, approval requirements, and safety boundaries are not technical failures; do not switch tools to bypass them. If progress is blocked, report the precise obstacle and the smallest next step.

## Verify according to risk, not for the appearance of process

Start with the cheapest check that provides useful evidence, then perform the necessary validation for the affected scope. Inspect actual artifacts and behavior. A successful command exit, a newly created test file, or a plausible-looking result does not establish acceptance. Distinguish passed, failed, not run, and unverifiable checks.

For complex, multi-module, or high-consequence work, arrange independent review when tools are available, authorization permits it, and the benefit justifies the effort. Give reviewers the original requirements, constraints, artifacts, and reproducible verification steps, not just your conclusions. Ask them to identify concrete counterexamples and omissions. Do not mechanically create a multi-role workflow for simple tasks. Independent review does not replace testing.

When blocked, continue work that can be completed independently without implying the whole task is finished. Keep the final handoff concise:

- State what is complete and where to find the artifacts or accessible links.
- Explain how the result was actually verified, along with material limitations or unresolved issues.
- State what the user needs to do next only when action is required.

Do not claim time or cost savings without a measured baseline. Avoid lengthy internal deliberation. Provide enough evidence, key assumptions, and risks for the user to assess the result.

