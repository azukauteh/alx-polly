/** @type {import('jest').Config} */
const config = {
  // ✅ Simulate browser-like environment for React components
  testEnvironment: "jsdom",

  // ✅ Transform TypeScript and JSX files using ts-jest
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // ✅ Handle CSS imports in components (e.g., Tailwind, modules)
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1", // ✅ Support for path aliases like "@/components"
  },

  // ✅ Load custom environment setup (e.g., matchers, mocks)
  setupFilesAfterEnv: ["<rootDir>/jest.env.js"],

  // ✅ Optional: Include test file patterns if needed
  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],

  // ✅ Optional: Improve test output readability
  verbose: true,
};

module.exports = config;
