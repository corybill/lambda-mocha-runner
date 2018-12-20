"use strict";

const Errr = require("errr");

const MochaProxy = require("../proxies/mocha-proxy");
const Constants = require("../constants");

class ExecuteTests {
  static next(state) {
    const testFiles = state.getTestFiles();
    const mochaOptions = state.getMochaOptions();

    return MochaProxy.run(mochaOptions, testFiles).then((testResults) => {
      state.setTestResults(testResults);
    }).catch((err) => {
      Errr.newError(Constants.Errors.TestExecutionError.Message)
        .set("errorCode", Constants.Errors.TestExecutionError.Code)
        .appendTo(err).throw();
    });
  }
}

module.exports = ExecuteTests;