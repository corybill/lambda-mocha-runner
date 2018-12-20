"use strict";

const Constants = require("../constants");

class ProcessTestResults {
  static next(state) {
    const testResults = state.getTestResults() || [];

    const processedTestResults = [];

    let allTestsPassing = testResults.length > 0;
    let numPassing = 0;
    let numFailing = 0;

    testResults.forEach((testResult) => {
      const stackTrace = (testResult.err || {}).stack || "";

      if (!testResult.pending) {
        const isPassing = testResult.state === Constants.Mocha.Passed;

        let processed = {
          type: Constants.ResultTypes.Test,
          durationInMillis: testResult.duration,
          testTitle: testResult.fullTitle(),
          stackTrace, isPassing
        };

        (isPassing) ? numPassing++ : numFailing++;

        allTestsPassing = allTestsPassing && isPassing;

        processedTestResults.push(processed);
      }
    });

    let suiteResult = {
      type: Constants.ResultTypes.Suite,
      isPassing: allTestsPassing,
      numPassing, numFailing
    };

    state.setProcessedTestResults(processedTestResults);
    state.setSuiteResult(suiteResult);
  }
}

module.exports = ProcessTestResults;