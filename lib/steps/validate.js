"use strict";

const Preconditions = require("preconditions");

const Constants = require("../constants");

const preconditions = Preconditions.errr();

class Validate {
  static next(state) {
    const testDirectory = state.getTestDirectory();

    preconditions.shouldBeTruthy(testDirectory, Constants.Errors.EmptyTestDirectory.message)
      .set("errorCode", Constants.Errors.EmptyTestDirectory.Code)
      .debug({ testDirectory }).test();

    preconditions.shouldBeString(testDirectory, Constants.Errors.InvalidTestDirectory.message)
      .set("errorCode", Constants.Errors.InvalidTestDirectory.Code)
      .debug({ testDirectory }).test();
  }
}

module.exports = Validate;