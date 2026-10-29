# ADR-0003: Trusted main push CI on approved self-hosted runners

- Status: Accepted
- Date: 2026-10-29
- Work: video#28, plasius-ltd-site#1626, Feature #1597
- Feature flag: `platform.public-artifact-integrity.enabled`

## Context

Hosted CI and same-repository PR execution contradict the recovery task's
approved runner and public trust-boundary requirements. ADR-0002's hosted
publication decision remains valid; this decision supersedes only its CI policy.

## Decision

Both CI jobs use literal `[self-hosted, Linux, X64]`, main push events only,
and per-job main/event guards. Disable manual and reusable entry points.
Use the existing quarantined runner group, nonpersistent checkout credentials,
bounded job timeouts and cancellation of superseded main CI. No runner setting
is changed. No hosted fallback or caller-controlled runner selection is allowed.

## Alternatives and impact

Keeping hosted CI violates the acceptance criteria. Allowing same-repository PR
execution expands the trust boundary and is unnecessary. Local PR qualification
precedes review; exact-main CI after merge remains the publication requirement.
No runtime API or dependency change is required. Existing `@plasius/translations`
usage remains intact; no reusable package functionality is duplicated.

## Validation and release

Regression contracts require the trigger, labels, every job's guard, credentials,
timeouts, and unchanged hosted exact-SHA production OIDC publication. Run package
checks and coverage. No production release is inferred from a passing local test.
Before ordinary CD, require fresh publisher and never-used-version evidence.
The feature flag controls staged restoration, never mandatory integrity checks.

## Rollback

Disable the affected CI or distribution workflow/channel and staged restoration
via the stored flag. Do not restore administrative artifacts, hosted CI fallback,
write tokens, or removed versions. Resume only through reviewed forward changes.
