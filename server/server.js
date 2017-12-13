// @flow
/* eslint-disable no-process-env */

// #region imports
const express               = require('express');
const helmet                = require('helmet');
const chalk                 = require('chalk');
const next                  = require('next');
const bodyParser            = require('body-parser');
const RateLimit             = require('express-rate-limit');
const logger                = require('morgan');
const compress              = require('compression');
const appConfig             = require('./config/appConfig');
// #endregion

// #region variables/constants initialization
const port     = parseInt(process.env.PORT, 10) || appConfig.defaultPort;
const ipAdress = 'localhost';
const dev      = process.env.NODE_ENV !== 'production';
const app      = next({ dev });
const handle   = app.getRequestHandler();
// #endregion

// #region start next application
try {
  prepareNextApplication();
} catch (error) {
  /* eslint-disable no-console */
  console.log('prepareNextApplication FAILED: ', error);
  /* eslint-enable no-console */
}
// #endregion


async function prepareNextApplication() {
  await app.prepare();

  const server = express();

  // #region add app middlewares
  if (dev) {
    server.use(logger('dev'));
  }

  server.use(helmet());
  server.use(compress());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  // #endregion

  if (!dev) {
    // express-rate-limit in production to limit over-repeated requests to API
    server.use('/api/', new RateLimit(appConfig.rateLimit));
  }

  // #region handles service worker file request (NOTE: it won't work in dev mode but production only):
  server.get('/sw.js', (req, res) => app.serveStatic(req, res, '.next/service-worker.js'));
  // #endregion

  // default request handler by next handler:
  server.get('*', (req, res) => handle(req, res));

  server.listen(
    port,
    (err) =>  {
      if (err) {
        throw err;
      }

      /* eslint-disable no-console */
      console.log(`
        =====================================================================================
        -> Server (${chalk.bgBlue('monsieur robot')}) 🏃 (running) on ${chalk.green(ipAdress)}:${chalk.green(port)}
        =====================================================================================
      `);
      /* eslint-enable no-console */
    }
  );
}
