const { Pool } = require('pg');
const config = require('../config');

const dbConfig = {
  user: config.get('postgresql.user'),
  host: config.get('postgresql.host'),
  database: config.get('postgresql.database'),
  password: config.get('postgresql.password'),
  port: config.get('postgresql.port'),
};

console.log('dbConfig: ', dbConfig);

// see documentation on environment variable associated (https://node-postgres.com/features/connecting)
const pool = new Pool(dbConfig);

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
