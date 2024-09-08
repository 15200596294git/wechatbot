/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  rootDir: './',
  modulePaths: [
     "<rootDir>"
  ],
  moduleDirectories: ['node_modules'],
  // testEnvironment: "node",
  // transform: {
  //   "^.+.tsx?$": ["ts-jest",{
  //     useESM: true
  //   }],
  // },
  extensionsToTreatAsEsm: ['.ts'],
};