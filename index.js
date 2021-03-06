const { execSync, exec } = require("child_process");
const core = require('@actions/core');
const { release } = require("os");

try {
    execSync('brew install mint');
    execSync('mint install AckeeCZ/tapestry');
    execSync('git config --local user.email "action@github.com"');
    execSync('git config --local user.name "GitHub Action"');
    const tag = execSync('git describe --tags --abbrev=0').toString();
    execSync(`git push --delete origin ${tag}`)
    execSync(`git tag -d ${tag}`);
    const releaseActor = process.env.RELEASE_ACTOR ? process.env.RELEASE_ACTOR : process.env.GITHUB_ACTOR;
    execSync(
        `TAPESTRY_ACCESS_TOKEN=${releaseActor}:${process.env.GITHUB_TOKEN} tapestry release ${tag}`,
        {stdio: 'inherit'}
    );
  } catch (error) {
    core.setFailed(error.message);
  }
  