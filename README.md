#Mocha Lambda Runner
Easily run mocha tests programmatically from a lambda. This makes running integration tests from an AWS Lambda very simple.

## Install
```npm install lambda-mocha-runner```

## Contract
Runner.run takes two parameters:
1. mochaOptions - This gets passed directly into Mocha. [For More Information](https://mochajs.org/api/mocha).
2. testDir - The path to the directory with your tests. This should be relative to the root directory of your lambda.
## Example
```
const Runner = require("lambda-mocha-runner");

class Lambda {
  static run(event, context, callback) {
    const context = { mochaOptions: {}, testDir: "path/to/test/files" };
    
    Runner.run(context)
      .then((response) => callback(null, response))
      .catch((err) => callback(err));
  }
}

module.exports = Lambda;
```

## Sample Response Object
**All Tests Passing**
```
{
  suite: { type: "suite", isPassing: true, numPassing: 2, numFailing: 0 },
  tests: [
    {
      type: "test",
      isPassing: true,
      durationInMillis: 100,
      testTitle: "Given When Then it should do 1",
      stackTrace: ""
    },
    {
      type: "test",
      isPassing: true,
      durationInMillis: context.duration,
      testTitle: "Given When Then it should do 2",
      stackTrace: ""
    }
  ]
};
```

**One Test Failing**
```
{
  suite: { type: "suite", isPassing: false, numPassing: 1, numFailing: 1 },
  tests: [
    {
      type: "test",
      isPassing: true,
      durationInMillis: 100,
      testTitle: "Given When Then it should do 1",
      stackTrace: ""
    },
    {
      type: "test",
      isPassing: false,
      durationInMillis: context.duration,
      testTitle: "Given When Then it should do 2",
      stackTrace: "Some Strack Trace Will Be Here"
    }
  ]
};
```