// @flow

const appConfig = {
  defaultPort: 3001,

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // each API will have max access to 200 request within windowMs time
    delayMs: 0,
  },
};

module.exports = appConfig;
