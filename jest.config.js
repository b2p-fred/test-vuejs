module.exports = {
  verbose: true,

  // Appended to the tests names
  displayName: {
    name: "eProtocole",
    color: "blue",
  },

  // Global variables
  globals: {
    __DEV__: true,
  },

  // Global setup
  // globalSetup: "<rootDir>/jest.global.setup.js",
  // setupFiles: ["<rootDir>/src/__tests__/index.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/index.js"],

  roots: ["<rootDir>/tests"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    // '^vue$': 'vue/dist/vue.common.js',
    "vuetify/lib(.*)": "<rootDir>/node_modules/vuetify/es5$1",
  },

  modulePaths: [
    // "<rootDir>",
    "<rootDir>/src",
    "<rootDir>/node_modules",
  ],

  moduleFileExtensions: ["js", "vue", "json"],

  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },

  // activate code coverage measurements
  collectCoverage: true,

  collectCoverageFrom: ["<rootDir>/src/**/*.vue", "<rootDir>/src/**/*.js"],

  coverageDirectory: "<rootDir>/artifacts",

  coveragePathIgnorePatterns: ["dist", "/node_modules/"],

  // Define some specific coverage thresholds
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
    "./src/components/": {
      branches: 40,
      statements: 40,
    },
    // "./src/views/": {
    //     "branches": 40,
    //     "statements": 40
    // },
    // "./src/reducers/**/*.js": {
    //   "statements": 90
    // },
    // "./src/api/very-important-module.js": {
    //   "branches": 100,
    //   "functions": 100,
    //   "lines": 100,
    //   "statements": 100
    // }
  },

  // Testing in the browser vs Node.js
  testEnvironment: "jsdom",

  preset: "@vue/cli-plugin-unit-jest",
};
