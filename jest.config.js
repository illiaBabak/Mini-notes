/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.[jt]sx?$": require.resolve("babel-jest"),
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|@react-navigation" +
      "|expo" +
      "|expo-router" +
      "|@expo" +
      "|unimodules" +
      "|native-base" +
      "|expo-modules-core" +
      "|uuid" +
      ")/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
