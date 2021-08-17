module.exports = {
    testIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+[.](jsx?|tsx?)$": "<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: "jsdom"
}