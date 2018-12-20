"use strict";

const Fs = require("fs-extra");

class FileProxy {
  static getFileNames(testDir) {
    return Fs.readdirSync(testDir); // eslint-disable-line
  }

  static getCurrentWorkingDirectory() {
    return process.cwd();
  }
}

module.exports = FileProxy;
