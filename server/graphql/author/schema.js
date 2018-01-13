// @flow

// #region imports
const DatetimeSchema = require('../datetime/schema');
// #endregion

// #region types definition
const Schema = /* GraphQL */ `
  type Author {
    id: ID!
    nickname: String!
    twitter_id: String,
    date_creation: DateTime!
  }
`;

const AuthorSchema = [Schema, ...DatetimeSchema];

module.exports = AuthorSchema;
