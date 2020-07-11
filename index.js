const { execSync, exec } = require("child_process");
const core = require('@actions/core');
const github = require('@actions/github');

try {
    execSync('brew install mint');
    execSync('mint install fortmarek/tapestry@feature/github_release --force');
    const tag = execSync('git describe --tags').toString();
    execSync(`git tag -d ${tag}`);
    execSync(`tapestry action docs-update ${tag}`);
    execSync(
        `TAPESTRY_ACCESS_TOKEN=${github.actor}:${process.env.GITHUB_PERSONAL_ACCESS_TOKEN} tapestry release ${tag}`,
        {stdio: 'inherit'}
    );
  } catch (error) {
    core.setFailed(error.message);
  }
  