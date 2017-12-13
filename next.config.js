// @flow
// next.config.js (IMPORTANT: it will NOT be used in dev-with hot reload!)

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
module.exports = {
  // $FlowIgnore
  webpack: (config) => {
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
          '/static/css/**/*.css'
        ],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    );

    return config;
  }
};
