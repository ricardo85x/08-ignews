module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+[.](jsx?|tsx?)$": "<rootDir>/node_modules/babel-jest"
    },
    moduleNameMapper: {
        "[.](s?css|sass)$": "identity-obj-proxy"
    },
    testEnvironment: "jsdom",
    
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.tsx",
        "!src/**/*.test.tsx"
    ],
    coverageReporters: ["lcov", "json"]
}