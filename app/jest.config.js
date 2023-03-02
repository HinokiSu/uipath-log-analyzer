/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  modulePathIgnorePatterns: ["./dist/"]
}
export default jestConfig
