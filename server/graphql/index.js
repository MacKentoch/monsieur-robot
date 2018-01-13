// @flow

// #region imports
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
// #endregion

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;
