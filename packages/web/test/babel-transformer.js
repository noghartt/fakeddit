const { createTransformer } = require('babel-jest').default;

const config = require('../babel.config');

module.exports = createTransformer(config);
