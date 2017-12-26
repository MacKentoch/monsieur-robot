// @flow
// next.config.js (IMPORTANT: it will NOT be used in dev-with hot reload!)
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  // $FlowIgnore
  webpack: config => {
    // rules:
    // config.module.rules.push({
    //   test: /\.md$/,
    //   use: 'raw-loader',
    // });

    // plugins:
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        staticFileGlobs: [
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
          '/static/**/*.png',
          '/static/**/*.xml',
          '/static/**/*.json',
          '/static/**/*.txt',
          '/static/**/*.svg',
          '/static/css/**/*.css',
        ],
        runtimeCaching: [
          {
            handler: 'fastest', // 'networkFirst',
            urlPattern: /^https?.*/,
          },
        ],
      }),
    );

    return config;
  },
};
