"use strict";

class HandleSuccess {
  static next(state) {
    const tests = state.getProcessedTestResults();
    const suite = state.getSuiteResult();

    const response = { suite, tests };

    state.setResponse(response);
  }
}

module.exports = HandleSuccess;