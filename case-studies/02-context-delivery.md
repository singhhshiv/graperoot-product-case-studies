# Product strategy for AI coding infrastructure

**Status:** retrospective product analysis. The architecture decision is attributed to the technical cofounder; this document focuses on how a business cofounder can translate the capability into user value, positioning, and measurable product questions.

## The product story

Public GrapeRoot documentation describes an evolution from graph queries through MCP toward preparing relevant context upfront. The current documentation still includes an MCP server in the session flow, so the careful description is a change in context delivery rather than removal of MCP. [GrapeRoot documentation](https://graperoot.dev/docs)

The business and product question is: how should a technical advantage be explained and evaluated for developers and organizations? “Uses a code graph” is an implementation detail. “Helps an AI coding agent spend fewer tokens exploring and more tokens solving the task” is a value proposition that still needs a defined baseline and task-quality guardrails.

## Product strategy questions

- Which developer tasks benefit most from structured context?
- Is the value lower cost, faster completion, better quality, or fewer retries?
- Which part of the experience is self-serve, and which requires enterprise support?
- How does local-first operation change adoption, trust, and distribution?
- What evidence would falsify the positioning?

## Metric proposal

Use cost per successful task as a composite metric only after defining task success. Pair it with task quality, latency, activation, repeat usage, and privacy or setup guardrails. Token savings alone can reward omission; quality alone can hide an expensive workflow.

## Interactive artifact

The [context decision simulator](../simulator/index.html) is a new portfolio exercise. It compares synthetic upfront, on-demand, and hybrid strategies and intentionally exposes missing-context risk. It does not reproduce GrapeRoot benchmarks or establish product performance.

## Boundary of this case study

This is not a claim that you designed the context architecture. It demonstrates the PM work of positioning, measurement design, segmentation, and trade-off analysis around a technical product you co-founded.
