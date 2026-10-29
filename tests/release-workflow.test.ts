import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readWorkflow = (name: string): string =>
  readFileSync(resolve(process.cwd(), `.github/workflows/${name}.yml`), "utf8");
const cdWorkflow = readWorkflow("cd");
const ciWorkflow = readWorkflow("ci");

describe("package release trust boundary", () => {
  it("uses exact-main hosted OIDC publication without write tokens", () => {
    expect(cdWorkflow).toContain("runs-on: ubuntu-latest");
    expect(cdWorkflow).toContain("environment: production");
    expect(cdWorkflow).toContain("id-token: write");
    expect(cdWorkflow).toContain("Enforce exact-main successful CI");
    expect(cdWorkflow).toContain("refs/remotes/origin/main");
    expect(cdWorkflow).toContain("-f branch=main");
    expect(cdWorkflow).toContain("-f event=push");
    expect(cdWorkflow).toContain('-f head_sha="${EXPECTED_SHA}"');
    expect(cdWorkflow).toContain('conclusion == "success"');
    expect(cdWorkflow).toContain("Verify release runtime");
    expect(cdWorkflow).toContain('ACTUAL_NODE%%.*');
    expect(cdWorkflow).toContain('"11.5.1"');
    expect(cdWorkflow).toContain("--provenance");
    expect(cdWorkflow).not.toMatch(/NPM_TOKEN|NODE_AUTH_TOKEN/u);
  });

  it("limits self-hosted CI to trusted main pushes", () => {
    const triggers = ciWorkflow.split("permissions:")[0];
    expect(triggers).toContain("push:");
    expect(triggers).toContain("branches: [main]");
    expect(triggers).not.toMatch(/pull_request|workflow_dispatch|workflow_call|schedule/u);
    const jobs = [...ciWorkflow.matchAll(/^ {2}[a-z][\w-]*:\n([\s\S]*?)(?=^ {2}[a-z][\w-]*:|$(?![\s\S]))/gmu)]
      .map((match) => match[1]).filter((job) => job.includes("runs-on:"));
    expect(jobs).toHaveLength(2);
    for (const job of jobs) {
      expect(job).toContain("runs-on: [self-hosted, Linux, X64]");
      expect(job).toContain("github.event_name == 'push' && github.ref == 'refs/heads/main'");
      expect(job).toMatch(/timeout-minutes: (?:10|30)\b/u);
      expect(job).toContain("persist-credentials: false");
    }
    expect(ciWorkflow).toContain("package-manager-cache: false");
    expect(ciWorkflow).not.toMatch(/ubuntu-latest|pull_request_target|fromJSON|inputs\.|vars\./u);
    expect(ciWorkflow).toContain("cancel-in-progress: true");
  });
});
