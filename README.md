# GrapeRoot · Product case studies

Local working draft. Nothing here has been published. This repository documents your work as GrapeRoot's business cofounder and separates historical work from retrospective analysis and proposed artifacts.

GrapeRoot is an AI developer-tools product designed to help coding agents understand codebases with less wasted context. Your work spanned product strategy, positioning, customer discovery, enterprise development, growth, distribution, partnerships, sales, community, and product feedback. The case studies make that work legible for PM, AI PM, Growth PM, and developer-tools roles.

- [Case study 1: From developer adoption to enterprise demand](case-studies/01-enterprise-transition.md)
- [Case study 2: Product strategy for AI coding infrastructure](case-studies/02-context-delivery.md)
- [Case study 3: Prioritizing product development under startup constraints](case-studies/03-prioritization.md)
- [Evidence register and open questions](evidence/README.md)
- [Interactive simulator](simulator/index.html)

The case studies distinguish company-reported history, your account of your work, retrospective analysis, and proposed plans. The simulator uses invented tasks, costs, retrieval orders, and relevance labels. It is not GrapeRoot software or a reproduction of its benchmarks.

## Run locally

Requires Node.js 18+ for tests and Python 3 for a local static server. No dependencies, API keys, or account are required.

```sh
cd /Users/shivmahar/graperoot-product-case-studies
node --test simulator/model.test.mjs
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/simulator/ . Select a task and vary the budget and assumed tool overhead. Inspect which required context each strategy misses. Write a decision and export it as JSON. Notes and controls persist in this browser when local storage is available.

## Interpretation

Coverage means the share of manually labeled required snippets included. It is not task success. Budget includes selected snippet estimates plus modeled per-call overhead. Latency is a simple additive estimate; there is no model execution. File-level inclusion does not guarantee enough detail for a correct code change.

The strategies have different fixed rankings, so differences cannot isolate the effect of delivery architecture. A real evaluation would hold retrieval quality constant to test delivery overhead, then separately test retrieval approaches. All parameters are educational assumptions.

## Evidence discipline

Adoption and activity figures are currently recorded as user-provided historical figures: 10,000+ developers reached, 60+ countries, and approximately 1,500 weekly active users at a previously reported peak. Dates, definitions, and supporting records still need to be attached before these appear as verified outcomes. Enterprise pilots, customer feedback, license distribution, and willingness-to-pay work should likewise be described only at the level authorized for publication.

## Next steps

Add dates, artifacts, and precise ownership from your records. Replace open questions with evidence. Review confidentiality with your cofounder before publishing anything about customers, pilots, pricing, or internal product decisions.
