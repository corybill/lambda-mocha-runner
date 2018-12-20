"use strict";

const Preconditions = require("preconditions");
const Errr = require("errr");

const FileProxy = require("../proxies/file-proxy");
const Constants = require("../constants");

const preconditions = Preconditions.errr();

class LoadTestFiles {
  static next(state) {
    let testDirectory;
    let qualifiedTestDirectory;
    let cwd;

    try {
      testDirectory = state.getTestDirectory();

      testDirectory = testDirectory.split("/").filter((val) => !!val).join("/");

      cwd = FileProxy.getCurrentWorkingDirectory();

      qualifiedTestDirectory = `${cwd}/${testDirectory}`;

      const fileNames = FileProxy.getFileNames(qualifiedTestDirectory);

      const testFiles = [];

      fileNames.forEach((filePath) => {
        testFiles.push(`${qualifiedTestDirectory}/${filePath}`);
      });

      preconditions.shouldBeTruthy(testFiles.length > 0, Constants.Errors.NoTestFilesFound.message)
        .set("errorCode", Constants.Errors.NoTestFilesFound.Code).test();

      state.setTestFiles(testFiles);

    } catch (err) {
      Errr.newError(Constants.Errors.LoadTestFilesError.Message)
        .set("errorCode", Constants.Errors.LoadTestFilesError.Code)
        .debug({ cwd, testDirectory, qualifiedTestDirectory })
        .appendTo(err).throw();
    }
  }
}

module.exports = LoadTestFiles;