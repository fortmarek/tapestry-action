const { execSync } = require("child_process");

try {
    execSync()
  } catch (error) {
    core.setFailed(error.message);
  }
  