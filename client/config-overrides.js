module.exports = {
  jest: function override(config) {
    config.transformIgnorePatterns = [];
    config.transformIgnorePatterns.push(
      "/node_modules/(?!(ol|labelgun|mapbox-to-ol-style|ol-mapbox-style)/).*/"
    );
    return config;
  }
};
