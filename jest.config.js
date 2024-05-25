/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/types/",
    "/test/"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/types/",
    "/test/"

  ],
  moduleNameMapper: {
    "^@tests/(.*)$": "<rootDir>/test/$1",
    "^@srcTypes/(.*)$": "<rootDir>/src/types/$1",
    "^@src/(.*)$": "<rootDir>/src/$1"
  }
}
