const { execSync, exec } = require("child_process");
const core = require('@actions/core');
const github = require('@actions/github');

try {
    execSync('brew install mint');
    execSync('mint install fortmarek/tapestry@feature/github_release --force');
    const tag = execSync('git describe --tags').toString();
    execSync(`git tag -d ${tag}`);
    execSync('git config --global user.email "fortmarek@users.noreply.github.com"');
    execSync('git config --global user.name "fortmarek"');
    execSync('touch hello');
    execSync('git add hello');
    execSync('git commit -am "commit"');
    execSync('git push');
    // execSync(
    //     `TAPESTRY_ACCESS_TOKEN=${process.env.GITHUB_ACTOR}:${process.env.GITHUB_TOKEN} tapestry release ${tag}`,
    //     {stdio: 'inherit'}
    // );
  } catch (error) {
    core.setFailed(error.message);
  }
  