const path = require('path');
const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['development', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  debug: {
    doc: 'Global debug toggle',
    format: Boolean,
    default: false,
    env: 'DEBUG',
  },
  rateLimit: {
    windowMs: {
      doc: 'rate limit withing this window in milliseconds',
      format: Number,
      default: 15 * 60 * 1000, // 15 minutes
    },
    max: {
      doc: 'Max number of request each API have access within windowMs time',
      format: Number,
      default: 200, // each API will have max access to 200 request within windowMs time
    },
    delayMs: {
      doc: 'A delay before rateLimit in milliseconds',
      format: Number,
      default: 0,
    },
  },
  server: {
    host: {
      doc: 'The server url',
      format: 'url',
      default: 'localhost',
      env: 'SERVER_HOST',
    },
    port: {
      doc: 'The server port number',
      format: 'port',
      default: 3001,
      env: 'PORT',
    },
    externalUrl: {
      doc: 'The server external url',
      format: 'url',
      default: 'http://localhost:3000/',
      env: 'SERVER_EXT_URL',
    },
    bodyParser: {
      limit: {
        doc: 'bodyParser limit size',
        format: String,
        default: '16mb',
      },
    },
  },
  postgresql: {
    user: {
      doc: 'postgresql database user',
      format: String,
      default: 'postgres',
      env: 'PGUSER',
    },
    host: {
      doc: 'postgresql database host',
      format: String,
      default: 'localhost',
      env: 'PGHOST',
    },
    database: {
      doc: 'postgresql database name',
      format: String,
      default: 'postgres',
      env: 'PGDATABASE',
    },
    password: {
      doc: 'postgresql database password',
      format: String,
      default: '',
      env: 'PGPASSWORD',
    },
    port: {
      doc: 'postgresql database port',
      format: 'port',
      default: 5432,
      env: 'PGPORT',
    },
  },
  dateFormat: {
    doc: 'default date format (used for example to insert initial data)',
    format: String,
    default: 'DD-MM-YYYY',
  },
  graphql: {
    endpoint: {
      doc: 'graphql endpoint',
      format: String,
      default: '/graphql',
    },
  },
  graphiql: {
    endpoint: {
      doc: 'graphiql endpoint',
      format: String,
      default: '/graphiql',
    },
  },
  graphqlCursorSecret: {
    doc: 'secret to encode graphql cursors',
    format: String,
    default: 'DEFINITELY_NOT_ENOUGH_SECRET',
    env: 'QL_CURSOR_SECRET',
  },
  api: {
    endpoint: {
      doc: 'API endpoint',
      format: String,
      default: '/api',
    },
  },
});

const env = config.get('env');
config.loadFile(path.join(__dirname, `./${env}.json`));
config.validate();

module.exports = config;
