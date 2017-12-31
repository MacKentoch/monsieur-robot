// @flow

// #region imports
const express = require('express');
const helmet = require('helmet');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
const logger = require('morgan');
const compress = require('compression');
const config = require('../config');
// #endregion

const nextExpress = async app => {
  await app.prepare();

  const handle = app.getRequestHandler();
  const server = express();

  // #region add app middlewares
  if (config.get('env') !== 'production') {
    server.use(logger('dev'));
  }

  server.use(helmet());
  server.use(compress());
  server.use(
    bodyParser.json({
      limit: config.get('server.bodyParser.limit'),
    }),
  );
  server.use(bodyParser.urlencoded({ extended: true }));
  // #endregion

  if (config.get('env') === 'production') {
    // express-rate-limit in production to limit over-repeated requests to API
    server.use(
      config.get('graphiql.endpoint'),
      new RateLimit(config.get('rateLimit')),
    );
    server.use(
      config.get('api.endpoint'),
      new RateLimit(config.get('rateLimit')),
    );
  }

  // #region handles service worker file request (NOTE: it won't work in dev mode but production only):
  server.get('/sw.js', (req, res) =>
    app.serveStatic(req, res, '.next/service-worker.js'),
  );
  // #endregion

  // default request handler by next handler:
  server.get('*', (req, res) => handle(req, res));

  const port = config.get('server.port');

  server.listen(port, err => {
    if (err) {
      throw err;
    }
    const title = chalk.bgBlue('monsieur robot');
    const host = chalk.green(config.get('server.host'));
    /* eslint-disable no-console */
    console.log(`
        ===============================================================
        -> Server (${title}) 🏃 (running) on ${host}:${chalk.green(port)}
        ===============================================================
      `);
    /* eslint-enable no-console */
  });
};

module.exports = nextExpress;
