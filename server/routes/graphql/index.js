// @flow

// #region imports
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const Router = require('express-promise-router');
const config = require('../../config');
const loaders = require('../../data/loaders');
const schema = require('../../data/schema');
const { formatGraphqlError } = require('../../lib/graphqlErrors');
// #endregion

const router = new Router();

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