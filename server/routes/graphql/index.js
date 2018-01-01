// @flow

// #region imports
const chalk = require('chalk');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const Router = require('express-promise-router');
const express = require('express');
const config = require('../../config');
const loaders = require('../../graphql/loaders');
const schema = require('../../graphql/schema');
const { formatGraphqlError } = require('../../lib/Graphql');
// #endregion

// const router = new Router();
const router = express.Router();

const graphqlRoutes = () => {
  // graphqlExpress (graphql)
  router.use(
    config.get('graphql.endpoint'),
    graphqlExpress({
      schema,
      context: {
        loaders: loaders(),
      },
      formatError: formatGraphqlError,
    }),
  );

  // graphiqlExpress (graphiql)
  router.get(
    config.get('graphiql.endpoint'),
    graphiqlExpress({
      endpointURL: config.get('graphql.endpoint'),
    }),
  );

  return router;
};

module.exports = graphqlRoutes;
