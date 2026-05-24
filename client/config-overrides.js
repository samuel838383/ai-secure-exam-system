module.exports = function override(config) {
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
    util: require.resolve("util/"),
    assert: require.resolve("assert/"),
    fs: false,
    vm: require.resolve("vm-browserify"),
  };

  return config;
};