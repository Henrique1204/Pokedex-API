module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['/*.png/'],
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
  },
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageReporters: ['lcov', 'json'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.test\\.ts$',
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    'src(.*)$': '<rootDir>/src/$1',
  },
};
