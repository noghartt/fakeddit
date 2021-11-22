// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@fakeddit/babel');

const customConfig = {
  ...config,
  presets: [
    ...config.presets,
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};

module.exports = customConfig;
