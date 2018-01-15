// @flow
/* eslint-disable camelcase */

// #region imports
const Twitter = require('./node-twitter/twitter');
const config = require('../config');
// #endregion

const twitterClient = new Twitter({
  consumer_key: config.get('twitter.consumerKey'),
  consumer_secret: config.get('twitter.consumerSecret'),
  access_token_key: config.get('twitter.accessTokenKey'),
  access_token_secret: config.get('twitter.accessTokenSecret'),
});

module.exports = twitterClient;
