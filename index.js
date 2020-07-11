const { execSync, exec } = require("child_process");
const github = require('@actions/github');
const core = require('@actions/core');

try {
    execSync('brew install mint');
    execSync('mint install fortmarek/tapestry@feature/github_release --force');
    const tag = execSync('git describe --tags').toString();
    execSync(`git tag -d ${tag}`);
    execSync(`tapestry release ${tag}`);
  } catch (error) {
    core.setFailed(error.message);
  }
  