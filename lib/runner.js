"use strict";

const Errr = require("errr");

const State = require("./state/state");

const Validate = require("./steps/validate");
const ExecuteTests = require("./steps/execute-tests");
const LoadTestFiles = require("./steps/load-test-files");
const ProcessTestResults = require("./steps/process-test-results");
const HandleSuccess = require("./steps/handle-success");

const Constants = require("./constants");

class Runner {
  static run(context) {
    const state = State.new(context);

    return Promise.resolve()
      .then(() => state.accept(Validate))
      .then(() => state.accept(LoadTestFiles))
      .then(() => state.accept(ExecuteTests))
      .then(() => state.accept(ProcessTestResults))
      .then(() => state.accept(HandleSuccess))
      .then(() => state.getResponse())
      .catch((err) => {
        Errr.newError(Constants.Errors.MochaLambdaRunner.Message)
          .set("reason", Constants.Errors[err.errorCode].Message)
          .appendTo(err).throw();
      });
  }

}

module.exports = Runner;