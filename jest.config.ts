module.exports = {
  projects: ['<rootDir>/packages/server/jest.config.js'],
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
};
