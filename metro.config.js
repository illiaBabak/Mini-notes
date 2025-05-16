const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  assert: require.resolve("assert/"),
  console: require.resolve("console-browserify"),
  process: require.resolve("process/browser"),
  stream: require.resolve("stream-browserify"),
  util: require.resolve("util/"),
};

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
