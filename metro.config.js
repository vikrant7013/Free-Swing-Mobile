const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Polyfill Node built-ins that react-native-svg v15 imports
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    ...config.resolver?.extraNodeModules,
    buffer: require.resolve("buffer/"),
  },
};

module.exports = withNativeWind(config, { input: "./src/global.css" });
