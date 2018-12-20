"use strict";

const Errr = require("errr");

const Constants = require("../constants");

class State {

  constructor(context) {
    this._testDirectory = context.testDir;
    this._mochaOptions = context.mochaOptions;
  }

  setProcessedTestResults(processedTestResults) {this._processedTestResults = processedTestResults;}
  setResponse(response) {this._response = response;}
  setSuiteResult(suiteResult) {this._suiteResult = suiteResult;}
  setTestFiles(testFiles) {this._testFiles = testFiles;}
  setTestResults(testResults) {this._testResults = testResults;}

  getMochaOptions() {return this._mochaOptions;}
  getProcessedTestResults() {return this._processedTestResults;}
  getResponse() {return this._response;}
  getSuiteResult() {return this._suiteResult;}
  getTestDirectory() {return this._testDirectory;}
  getTestFiles() {return this._testFiles;}
  getTestResults() {return this._testResults;}

  accept(step) {
    return Promise.resolve().then(() => {
      return step.next(this);
    }).catch((err) => {
      Errr.newError(Constants.Errors.StepError.Message)
        .debug({ step: step.name }).appendTo(err).throw();
    });
  }

  static new(context) {
    return new State(context);
  }
}

module.exports = State;
