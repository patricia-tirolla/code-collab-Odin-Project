module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],

  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/fileMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/fileMock.js',
    '\\.ejs$': '<rootDir>/tests/ejsMock.js',
  },
};
