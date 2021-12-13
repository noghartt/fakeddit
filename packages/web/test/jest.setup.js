require('@testing-library/jest-dom');

jest.mock('../src/relay/RelayEnvironment.ts', () => {
  const { createMockEnvironment } = require('relay-test-utils');
  return createMockEnvironment();
});

// TODO: For some reason, some tests were causing interference in another tests
// so was necessary to clean the localStorage to run the tests correctly.
afterEach(() => global.window.localStorage.clear());
