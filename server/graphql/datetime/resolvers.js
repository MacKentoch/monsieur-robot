// @flow
/* eslint-disable camelcase */

// #region imports
const { GraphQLDateTime } = require('graphql-iso-date');
// #endregion

const resolvers = {
  DateTime: GraphQLDateTime,
};

module.exports = resolvers;
