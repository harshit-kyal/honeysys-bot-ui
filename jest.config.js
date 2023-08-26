export const testEnvironment = 'jsdom';
export const roots = ['<rootDir>/src'];
export const moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx'];
export const testMatch = ['<rootDir>/src/**/*.test.(js|jsx|ts|tsx)'];
export const transform = {
    '^.+\\.(ts|tsx)$': 'ts-jest',
};
export const testPathIgnorePatterns = ['<rootDir>/node_modules/', '\\.d\\.ts$'];
export const type = "module"