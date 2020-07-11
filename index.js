const { execSync, exec } = require("child_process");
const core = require('@actions/core');

try {
    execSync('brew install mint');
    execSync('mint install fortmarek/tapestry@feature/github_release --force');
    const tag = execSync('git describe --tags').toString();
    execSync(`git tag -d ${tag}`);
    execSync(`tapestry action docs-update ${tag}`);
    execSync(`TAPESTRY_ACCESS_TOKEN=${process.env.GITHUB_TOKEN} tapestry release ${tag}`);
  } catch (error) {
    core.setFailed(error.message);
  }
  