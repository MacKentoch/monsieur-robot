// @flow
/* eslint-disable no-process-env */

// #region imports
const next = require('next');
const nextExpress = require('./lib/nextExpress');
const config = require('./config');
// #endregion

// #region variables/constants initialization
const dev = config.get('env') !== 'production';
const app = next({ dev });
// #endregion

// #region start next application
try {
  nextExpress(app);
} catch (error) {
  /* eslint-disable no-console */
  console.log('prepareNextApplication FAILED: ', error);
  /* eslint-enable no-console */
}
// #endregion

// async function prepareNextApplication() {
//   await app.prepare();

//   const server = express();

//   // #region add app middlewares
//   if (dev) {
//     server.use(logger('dev'));
//   }

//   server.use(helmet());
//   server.use(compress());
//   server.use(bodyParser.json());
//   server.use(bodyParser.urlencoded({ extended: true }));
//   // #endregion

//   if (!dev) {
//     // express-rate-limit in production to limit over-repeated requests to API
//     server.use('/api/', new RateLimit(appConfig.rateLimit));
//   }

//   // #region handles service worker file request (NOTE: it won't work in dev mode but production only):
//   server.get('/sw.js', (req, res) =>
//     app.serveStatic(req, res, '.next/service-worker.js'),
//   );
//   // #endregion

//   // default request handler by next handler:
//   server.get('*', (req, res) => handle(req, res));

//   server.listen(port, err => {
//     if (err) {
//       throw err;
//     }
//     const title = chalk.bgBlue('monsieur robot');
//     const ip = chalk.green(ipAdress);
//     /* eslint-disable no-console */
//     console.log(`
//         ===============================================================
//         -> Server (${title}) 🏃 (running) on ${ip}:${chalk.green(port)}
//         ===============================================================
//       `);
//     /* eslint-enable no-console */
//   });
// }
