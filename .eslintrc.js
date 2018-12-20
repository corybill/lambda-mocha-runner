"use strict";

module.exports = {
  "env": {
    "browser": true,
    "mocha": true,
    "node": true,
    "es6": true
  },
  "globals": {
    "browser": true,
    "expect": true,
    "mount": true,
    "nock": true,
    "shallow": true,
    "sinon": true,
    "assert": true
  },
  "extends": "eslint:recommended",
  "rules": {
    // common
    "indent": [2, 2, { "SwitchCase": 1 }], // specify tab or space width for your code
    "quotes": [2, "double", { "allowTemplateLiterals": true }], // specify whether backticks, double or single quotes should be used
    "linebreak-style": [2, "unix"], // disallow mixed 'LF' and 'CRLF' as linebreaks
    "semi": [2, "always"], // require or disallow use of semicolons instead of ASI

    // errors
    "no-extra-parens": [2, "functions"], // disallow unnecessary parentheses
    "no-unexpected-multiline": [2], // Avoid code that looks like two expressions but is actually one
    "valid-jsdoc": [0], // Ensure JSDoc comments are valid

    // best practices
    "accessor-pairs": [0], // Enforces getter/setter pairs in objects
    "block-scoped-var": [2], // treat var statements as if they were block scoped
    "complexity": [0], // specify the maximum cyclomatic complexity allowed in a program
    "consistent-return": [0], // require return statements to either always or never specify values
    "curly": [2, "all"], // specify curly brace conventions for all control statements
    "default-case": [2], // require default case in switch statements
    "dot-notation": [2], // encourages use of dot notation whenever possible
    "dot-location": [2, "property"], // enforces consistent newlines before or after dots
    "eqeqeq": [2, "smart"], // require the use of === and !==
    "guard-for-in": [2], // make sure for-in loops have an if statement
    "no-alert": [2], // disallow the use of alert, confirm, and prompt
    "no-caller": [2], // disallow use of arguments.caller or arguments.callee
    "no-div-regex": [0], // disallow division operators explicitly at beginning of regular expression
    "no-else-return": [0], // disallow else after a return in an if
    "no-eq-null": [2], // disallow comparisons to null without a type-checking operator
    "no-eval": [2], // disallow use of eval()
    "no-extend-native": [2], // disallow adding to native types
    "no-extra-bind": [2], // disallow unnecessary function binding
    "no-fallthrough": [2], // disallow fallthrough of case statements (recommended)
    "no-floating-decimal": [2], // disallow the use of leading or trailing decimal points in numeric literals
    "no-implicit-coercion": [0], // disallow the type conversions with shorter notations
    "no-implied-eval": [2], // disallow use of eval()-like methods
    "no-invalid-this": [0], // disallow this keywords outside of classes or class-like objects
    "no-iterator": [2], // disallow usage of __iterator__ property
    "no-labels": [2], // disallow use of labeled statements
    "no-lone-blocks": [2], // disallow unnecessary nested blocks
    "no-loop-func": [2], // disallow creation of functions within loops
    "no-multi-spaces": [2], // disallow use of multiple spaces
    "no-multi-str": [2], // disallow use of multiline strings
    "no-native-reassign": [2], // disallow reassignments of native objects
    "no-new-func": [2], // disallow use of new operator for Function object
    "no-new-wrappers": [0], // disallows creating new instances of String,Number, and Boolean
    "no-new": [2], // disallow use of the new operator when not part of an assignment or comparison
    "no-octal-escape": [2], // disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    "no-octal": [2], // disallow use of octal literals (recommended)
    "no-param-reassign": [0, { "props": false }], // disallow reassignment of function parameters
    "no-process-env": [0], // disallow use of process.env
    "no-proto": [2], // disallow usage of __proto__ property
    "no-redeclare": [2, { "builtinGlobals": true }], // disallow declaring the same variable more than once (recommended)
    "no-return-assign": [0], // disallow use of assignment in return statement
    "no-script-url": [2], // disallow use of javascript: urls.
    "no-self-compare": [2], // disallow comparisons where both sides are exactly the same
    "no-sequences": [2], // disallow use of the comma operator
    "no-throw-literal": [1], // restrict what can be thrown as an exception
    "no-unused-expressions": [2, { "allowTernary": true }], // disallow usage of expressions in statement position
    "no-useless-call": [2], // disallow unnecessary .call() and .apply()
    "no-useless-concat": [2], // disallow unnecessary concatenation of literals or template literals
    "no-void": [2], // disallow use of the void operator
    "no-warning-comments": [0, { "terms": ["todo", "fixme"], "location": "start" }], // disallow usage of configurable warning terms in comments": [2], // e.g. TODO or FIXME
    "no-with": [2], // disallow use of the with statement
    "radix": [2], // require use of the second argument for parseInt()
    "vars-on-top": [0], // require declaration of all vars at the top of their containing scope
    "wrap-iife": [2], // require immediate function invocation to be wrapped in parentheses
    "yoda": [0, "never"], // require or disallow Yoda conditions
    "strict": [2, "global"], // use strict model

    // Variables
    "init-declarations": [0], // enforce or disallow variable initializations at definition
    "no-catch-shadow": [0], // disallow the catch clause parameter name being the same as a variable in the outer scope
    "no-delete-var": [2], // disallow deletion of variables (recommended)
    "no-label-var": [2], // disallow labels that share a name with a variable
    "no-shadow-restricted-names": [2], // disallow shadowing of names such as arguments
    "no-shadow": [2], // disallow declaration of variables already declared in the outer scope
    "no-undef-init": [2], // disallow use of undefined when initializing variables
    "no-undef": [2], // disallow use of undeclared variables unless mentioned in a /*global */ block (recommended)
    "no-undefined": [0], // disallow use of undefined variable
    "no-unused-vars": [2], // disallow declaration of variables that are not used in the code (recommended)
    "no-use-before-define": [2, "nofunc"], // disallow use of variables before they are defined

    // nodejs
    "callback-return": [2, ["callback", "cb", "next"]], // enforce return after a callback
    "handle-callback-err": [2, "^(err\\d?|error\\d?|^.+Err$|^.+Error$)$"], // enforce error handling in callbacks
    "no-mixed-requires": [2, false], // disallow mixing regular variable and require declarations
    "no-new-require": [2], // disallow use of new operator with the require function
    "no-path-concat": [2], // disallow string concatenation with __dirname and __filename
    "no-process-exit": [0], // disallow process.exit()
    "no-restricted-modules": [0], // restrict usage of specified node modules
    "no-sync": [0], // disallow use of synchronous methods

    // Stylistic
    "array-bracket-spacing": [2, "never"], // enforce spacing inside array brackets
    "block-spacing": [2, "never"], // disallow or enforce spaces inside of single line blocks
    "brace-style": [2, "1tbs", { "allowSingleLine": true }], // enforce one true brace style
    "camelcase": [2, { "properties": "always" }], // require camel case names
    "comma-spacing": [2, { "before": false, "after": true }], // enforce spacing before and after comma
    "comma-style": [2, "last"], // enforce one true comma style
    "computed-property-spacing": [2, "never"], // require or disallow padding inside computed properties
    "consistent-this": [2, "self"], // enforce consistent naming when capturing the current execution context
    "eol-last": [0], // enforce newline at the end of file, with no multiple empty lines
    "func-names": [0], // require function expressions to have a name
    "func-style": [2, "declaration", { "allowArrowFunctions": true }], // enforce use of function declarations or expressions
    "id-length": [2, { "min": 3, "properties": "never", "exceptions": ["Q", "q", "_", "cb", "id", "i", "j", "Fs", "S3", "s3"] }], // this option enforces minimum and maximum identifier lengths (variable names, property names etc.)
    "id-match": [0], // require identifiers to match the provided regular expression
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }], // enforce spacing between keys and values in object literal properties
    "lines-around-comment": [0], // enforce empty lines around comments
    "max-lines": [0], // enforce max lines
    "max-nested-callbacks": [2, 6], // specify the maximum depth callbacks can be nested
    "new-cap": [2, { "capIsNewExceptions": ["Router"] }], // require a capital letter for constructors
    "new-parens": [2], // disallow the omission of parentheses when invoking a constructor with no arguments
    "newline-after-var": [2, "always"], // require or disallow an empty newline after variable declarations
    "no-array-constructor": [2], // disallow use of the Array constructor
    "no-continue": [2], // disallow use of the continue statement
    "no-inline-comments": [0], // disallow comments inline after code
    "no-lonely-if": [0], // disallow if as the only statement in an else block
    "no-mixed-spaces-and-tabs": [2], // disallow mixed spaces and tabs for indentation (recommended)
    "no-multiple-empty-lines": [2, { "max": 1 }], // disallow multiple empty lines
    "no-nested-ternary": [2], // disallow nested ternary expressions
    "no-new-object": [2], // disallow the use of the Object constructor
    "no-spaced-func": [2], // disallow space between function identifier and application
    "no-ternary": [0], // disallow the use of ternary operators
    "no-trailing-spaces": [2, { "skipBlankLines": true }], // disallow trailing whitespace at the end of lines
    "no-underscore-dangle": [0], // disallow dangling underscores in identifiers
    "no-unneeded-ternary": [2], // disallow the use of Boolean literals in conditional expressions
    "object-curly-spacing": [2, "always"], // require or disallow padding inside curly braces
    "one-var": [0], // require or disallow one variable declaration per function
    "operator-assignment": [0], // require assignment operator shorthand where possible or prohibit it entirely
    "operator-linebreak": [2, "after"], // enforce operators to be placed before or after line breaks
    "padded-blocks": [0, "never"], // enforce padding within blocks
    "quote-props": [2, "consistent"], // require quotes around object literal property names
    "semi-spacing": [2, { "before": false, "after": true }], // enforce spacing before and after semicolons
    "sort-vars": [0], // sort variables within the same declaration block
    "keyword-spacing": [2], // require a space after certain keywords
    "space-before-blocks": [2, "always"], // require or disallow a space before blocks
    "space-before-function-paren": [2, { "anonymous": "always", "named": "never" }], // require or disallow a space before function opening parenthesis
    "space-in-parens": [2, "never"], // require or disallow spaces inside parentheses
    "space-infix-ops": [2, { "int32Hint": false }], // require spaces around operators
    "space-return-throw-case": [0], // require a space after return, throw, and case
    "space-unary-ops": [2, { "words": true, "nonwords": false }], // require or disallow spaces before/after unary operators
    "spaced-comment": [2, "always"], // require or disallow a space immediately following the // or /* in a comment
    "wrap-regex": [2] // require regex literals to be wrapped in parentheses
  }
};