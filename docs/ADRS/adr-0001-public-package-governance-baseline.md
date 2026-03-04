# ADR-0001: Public Package Governance Baseline

- Status: Accepted
- Date: 2026-03-04

## Context

`@plasius/video` is a public package consumed independently from a single host application. It needs explicit documentation and governance standards consistent with other `@plasius/*` packages.

## Decision

Adopt package governance requirements aligned with the wider ecosystem baseline:

- Maintain `README.md`, `CHANGELOG.md`, and ADR documentation in-repo.
- Keep legal and security policy documents versioned in the repository.
- Enforce CI quality gates (typecheck/lint/tests/coverage/security audit) before release.
- Publish through GitHub CD workflows after CI has passed.

## Consequences

- Positive: Decision history is discoverable and onboarding is easier.
- Positive: Quality and release expectations are explicit for maintainers.
- Negative: Ongoing documentation maintenance overhead is required.

## Alternatives Considered

- Rely only on pull request history: Rejected because architectural decisions become hard to find.
- Keep ADRs only in central docs: Rejected because package-level context and history are easier to maintain in-repo.
