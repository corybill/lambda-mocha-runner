"use strict";

const Maddox = require("maddox");

const Runner = require("../../lib/runner");
const FileProxy = require("../../lib/proxies/file-proxy");
const MochaProxy = require("../../lib/proxies/mocha-proxy");
const Constants = require("../../lib/constants");
const Random = require("../random");

const Scenario = Maddox.functional.FromPromiseScenario;

describe("Given the mocha lambda runner", () => {
  let context;

  describe("when testing the mocha lambda runner, it", () => {

    beforeEach(() => {
      context = {};

      context.prepareForTest = () => {
        context.entryPointObject = Runner;
        context.entryPointFunction = "run";
      };

      context.setupValues = () => {
        context.testDirectory = Random.uniqueId();
        context.mochaOptions = { someOption: Random.uniqueId() };
        context.fileName1 = Random.uniqueId();
        context.fileName2 = Random.uniqueId();
      };

      context.setupInput = () => {
        context.inputParams = [{ testDir: `/${context.testDirectory}/`, mochaOptions: context.mochaOptions }];
      };

      context.setupGetCurrentWorkingDirectory = () => {
        context.getCwdParams = [];
        context.getCwdResponse = `${Random.uniqueId()}/${Random.uniqueId()}`;
      };

      context.setupGetFileNames = () => {
        context.qualityTestDirectory = `${context.getCwdResponse}/${context.testDirectory}`;

        context.getFileNamesParams = [context.qualityTestDirectory];
        context.getFileNamesResponse = [context.fileName1, context.fileName2];
        context.getFileNamesResponseEmpty = [];
        context.getFileNamesResponseError = new Error(Random.uniqueId());
      };

      context.setupRunTest = () => {
        context.testTitle1 = Random.uniqueId();
        context.testTitle2 = Random.uniqueId();
        context.duration = 10;

        const fullTitle1 = () => context.testTitle1;
        const fullTitle2 = () => context.testTitle2;

        context.testResult1 = { fullTitle: fullTitle1, state: Constants.Mocha.Passed, duration: context.duration };
        context.testResult2 = { fullTitle: fullTitle2, state: Constants.Mocha.Passed, duration: context.duration };

        const testFiles = [`${context.qualityTestDirectory}/${context.fileName1}`, `${context.qualityTestDirectory}/${context.fileName2}`];

        context.runTestParams = [context.mochaOptions, testFiles];
        context.runTestResponse = [context.testResult1, context.testResult2];
        context.runTestResponseFail = new Error(Random.uniqueId());
      };

      context.setupExpected = () => {
        context.expectedResponse = {
          suite: { type: Constants.ResultTypes.Suite, isPassing: true, numPassing: 2, numFailing: 0 },
          tests: [
            {
              type: Constants.ResultTypes.Test,
              isPassing: true,
              durationInMillis: context.duration,
              testTitle: context.testTitle1,
              stackTrace: ""
            },
            {
              type: Constants.ResultTypes.Test,
              isPassing: true,
              durationInMillis: context.duration,
              testTitle: context.testTitle2,
              stackTrace: ""
            }
          ]
        };
      };
    });

    it("should run 2 tests and handle passing tests.", function (done) {
      context.prepareForTest();
      context.setupValues();
      context.setupInput();
      context.setupGetCurrentWorkingDirectory();
      context.setupGetFileNames();
      context.setupRunTest();
      context.setupExpected();

      new Scenario(this)
        .mockThisFunction("FileProxy", "getCurrentWorkingDirectory", FileProxy)
        .mockThisFunction("FileProxy", "getFileNames", FileProxy)
        .mockThisFunction("MochaProxy", "run", MochaProxy)

        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)

        .shouldBeCalledWith("FileProxy", "getCurrentWorkingDirectory", context.getCwdParams)
        .doesReturn("FileProxy", "getCurrentWorkingDirectory", context.getCwdResponse)

        .shouldBeCalledWith("FileProxy", "getFileNames", context.getFileNamesParams)
        .doesReturn("FileProxy", "getFileNames", context.getFileNamesResponse)

        .shouldBeCalledWith("MochaProxy", "run", context.runTestParams)
        .doesReturnWithPromise("MochaProxy", "run", context.runTestResponse)

        .test((err, response) => {
          Maddox.compare.equal(err, undefined, "Err message does not match expected.");
          Maddox.compare.subset(response, context.expectedResponse, "Response does not match expected.");
          done();

        }).catch((err) => {
          done(err);
        });
    });

    it("should run 2 tests and handle one failing tests.", function (done) {
      context.setupRunTest = () => {
        context.testTitle1 = Random.uniqueId();
        context.testTitle2 = Random.uniqueId();
        context.duration = 10;

        const fullTitle1 = () => context.testTitle1;
        const fullTitle2 = () => context.testTitle2;

        context.error1 = new Error(Random.uniqueId());

        context.testResult1 = { fullTitle: fullTitle1, state: Constants.Mocha.Passed, duration: context.duration };
        context.testResult2 = { fullTitle: fullTitle2, state: Constants.Mocha.Failed, duration: context.duration, err: context.error1 };

        const testFiles = [`${context.qualityTestDirectory}/${context.fileName1}`, `${context.qualityTestDirectory}/${context.fileName2}`];

        context.runTestParams = [context.mochaOptions, testFiles];
        context.runTestResponse = [context.testResult1, context.testResult2];
      };

      context.setupExpected = () => {
        context.expectedResponse = {
          suite: { type: Constants.ResultTypes.Suite, isPassing: false, numPassing: 1, numFailing: 1 },
          tests: [
            {
              type: Constants.ResultTypes.Test,
              isPassing: true,
              durationInMillis: context.duration,
              testTitle: context.testTitle1,
              stackTrace: ""
            },
            {
              type: Constants.ResultTypes.Test,
              isPassing: false,
              durationInMillis: context.duration,
              testTitle: context.testTitle2,
              stackTrace: context.error1.stack
            }
          ]
        };
      };

      context.prepareForTest();
      context.setupValues();
      context.setupInput();
      context.setupGetCurrentWorkingDirectory();
      context.setupGetFileNames();
      context.setupRunTest();
      context.setupExpected();

      new Scenario(this)
        .mockThisFunction("FileProxy", "getCurrentWorkingDirectory", FileProxy)
        .mockThisFunction("FileProxy", "getFileNames", FileProxy)
        .mockThisFunction("MochaProxy", "run", MochaProxy)

        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)

        .shouldBeCalledWith("FileProxy", "getCurrentWorkingDirectory", context.getCwdParams)
        .doesReturn("FileProxy", "getCurrentWorkingDirectory", context.getCwdResponse)

        .shouldBeCalledWith("FileProxy", "getFileNames", context.getFileNamesParams)
        .doesReturn("FileProxy", "getFileNames", context.getFileNamesResponse)

        .shouldBeCalledWith("MochaProxy", "run", context.runTestParams)
        .doesReturnWithPromise("MochaProxy", "run", context.runTestResponse)

        .test((err, response) => {
          Maddox.compare.equal(err, undefined, "Err message does not match expected.");
          Maddox.compare.subset(response, context.expectedResponse, "Response does not match expected.");
          done();

        }).catch((err) => {
          done(err);
        });
    });

    it("should throw when unable to get file names in directory.", function (done) {
      context.setupExpected = () => {
        context.expectedResponse = Constants.Errors.LoadTestFilesError.Message;
      };

      context.prepareForTest();
      context.setupValues();
      context.setupInput();
      context.setupGetCurrentWorkingDirectory();
      context.setupGetFileNames();
      context.setupRunTest();
      context.setupExpected();

      new Scenario(this)
        .mockThisFunction("FileProxy", "getCurrentWorkingDirectory", FileProxy)
        .mockThisFunction("FileProxy", "getFileNames", FileProxy)
        .mockThisFunction("MochaProxy", "run", MochaProxy)

        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)

        .shouldBeCalledWith("FileProxy", "getCurrentWorkingDirectory", context.getCwdParams)
        .doesReturn("FileProxy", "getCurrentWorkingDirectory", context.getCwdResponse)

        .shouldBeCalledWith("FileProxy", "getFileNames", context.getFileNamesParams)
        .doesReturn("FileProxy", "getFileNames", context.getFileNamesResponseError)

        .test((err, response) => {
          Maddox.compare.equal(err.reason, context.expectedResponse, "Err message does not match expected.");
          Maddox.compare.equal(response, undefined, "Response does not match expected.");
          done();

        }).catch((err) => {
          done(err);
        });
    });

    it("should throw when no files are found in the test dir.", function (done) {
      context.setupExpected = () => {
        context.expectedResponse = Constants.Errors.NoTestFilesFound.Message;
      };

      context.prepareForTest();
      context.setupValues();
      context.setupInput();
      context.setupGetCurrentWorkingDirectory();
      context.setupGetFileNames();
      context.setupRunTest();
      context.setupExpected();

      new Scenario(this)
        .mockThisFunction("FileProxy", "getCurrentWorkingDirectory", FileProxy)
        .mockThisFunction("FileProxy", "getFileNames", FileProxy)
        .mockThisFunction("MochaProxy", "run", MochaProxy)

        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)

        .shouldBeCalledWith("FileProxy", "getCurrentWorkingDirectory", context.getCwdParams)
        .doesReturn("FileProxy", "getCurrentWorkingDirectory", context.getCwdResponse)

        .shouldBeCalledWith("FileProxy", "getFileNames", context.getFileNamesParams)
        .doesReturn("FileProxy", "getFileNames", context.getFileNamesResponseEmpty)

        .test((err, response) => {
          Maddox.compare.equal(err.reason, context.expectedResponse, "Err message does not match expected.");
          Maddox.compare.equal(response, undefined, "Response does not match expected.");
          done();

        }).catch((err) => {
          done(err);
        });
    });

    it("should throw when mocha proxy throws.", function (done) {
      context.setupExpected = () => {
        context.expectedResponse = Constants.Errors.TestExecutionError.Message;
      };

      context.prepareForTest();
      context.setupValues();
      context.setupInput();
      context.setupGetCurrentWorkingDirectory();
      context.setupGetFileNames();
      context.setupRunTest();
      context.setupExpected();

      new Scenario(this)
        .mockThisFunction("FileProxy", "getCurrentWorkingDirectory", FileProxy)
        .mockThisFunction("FileProxy", "getFileNames", FileProxy)
        .mockThisFunction("MochaProxy", "run", MochaProxy)

        .withEntryPoint(context.entryPointObject, context.entryPointFunction)
        .withInputParams(context.inputParams)

        .shouldBeCalledWith("FileProxy", "getCurrentWorkingDirectory", context.getCwdParams)
        .doesReturn("FileProxy", "getCurrentWorkingDirectory", context.getCwdResponse)

        .shouldBeCalledWith("FileProxy", "getFileNames", context.getFileNamesParams)
        .doesReturn("FileProxy", "getFileNames", context.getFileNamesResponse)

        .shouldBeCalledWith("MochaProxy", "run", context.runTestParams)
        .doesErrorWithPromise("MochaProxy", "run", context.runTestResponseFail)

        .test((err, response) => {
          Maddox.compare.equal(err.reason, context.expectedResponse, "Err message does not match expected.");
          Maddox.compare.equal(response, undefined, "Response does not match expected.");
          done();

        }).catch((err) => {
          done(err);
        });
    });
  });
});