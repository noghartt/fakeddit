const pkg = require('./package.json');

module.exports = {
  name: pkg.name,
  displayName: pkg.name,
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(j|t)sx?$',
  testPathIgnorePatterns: ['/node_modules/', './dist', '__generated__'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/tests$': '<rootDir>/test/test-utils.tsx',
    '^@/(.*)': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  transform: {
    '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer',
  },
};
