const { Pool } = require('pg');

// see documentation on environment variable associated (https://node-postgres.com/features/connecting)
const pool = new Pool();

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err /* , client */) => {
  /* eslint-disable no-console */
  console.error('Unexpected error on idle client', err);
  /* eslint-enable no-console */
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
