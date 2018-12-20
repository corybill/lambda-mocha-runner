"use strict";

exports.Mocha = {
  Passed: "passed",
  Failed: "failed"
};

exports.ResultTypes = {
  Suite: "suite",
  Test: "test"
};

exports.Errors = {
  EmptyTestDirectory: {
    Message: "Failed Validation: Test directory value is empty.",
    Code: "EmptyTestDirectory"
  },
  InvalidTestDirectory: {
    Message: "Failed Validation: You must provide a test directory string that points to the directory with your tests. The path should be relative to the current working directory (i.e. the root level of your lambda execution.",
    Code: "InvalidTestDirectory"
  },
  LambdaFailure: {
    Message: "Reporting lambda as failure, this shouldn't be possible as we code against it.",
    Code: "LambdaFailure"
  },
  LoadTestFilesError: {
    Message: "Failed to load the test files.",
    Code: "LoadTestFilesError"
  },
  MochaLambdaRunner: {
    Message: "Failed to execute the mocha test runner.",
    Code: "MochaLambdaRunner"
  },
  NoTestFilesFound: {
    Message: "No files found in the provided test directory. The path should be relative to the current working directory (i.e. the root level of your lambda execution.\",",
    Code: "NoTestFilesFound"
  },
  StepError: {
    Message: "Failed to execute step.",
    Code: "StepError"
  },
  TestExecutionError: {
    Message: "Failed to execute test module or process test results.",
    Code: "TestExecutionError"
  }
};