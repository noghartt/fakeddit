/* eslint-disable @typescript-eslint/no-var-requires */
const {
  default: { createTransformer },
} = require('babel-jest');

const config = require('@fakeddit/babel');

module.exports = createTransformer({ ...config });
