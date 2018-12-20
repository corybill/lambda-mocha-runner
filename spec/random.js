"use strict";

const Chance = require("chance");

const chance = new Chance();

class Random {
  static uniqueId(length) {
    return chance.hash({ length: length || 24 });
  }

  static word() {
    return chance.word();
  }
}

module.exports = Random;
