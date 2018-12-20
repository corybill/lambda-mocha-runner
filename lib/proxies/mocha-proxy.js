"use strict";

const Mocha = require("mocha");
const ClearModule = require("clear-module");

class MochaProxy {

  static run(mochaOptions, testFiles) {
    return new Promise((resolve, reject) => {
      const testResults = [];

      try {
        const mocha = new Mocha(mochaOptions);

        testFiles.forEach((testFile) => {
          mocha.addFile(testFile);
        });

        const runner = mocha.run();

        runner.on("test end", (testResult) => {
          testResults.push(testResult);
        });

        runner.on("end", () => {
          runner.removeAllListeners("test end");
          runner.removeAllListeners("end");

          ClearModule.all(); // Needed to ensure all tests are executed every execution.

          resolve(testResults);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

}

module.exports = MochaProxy;