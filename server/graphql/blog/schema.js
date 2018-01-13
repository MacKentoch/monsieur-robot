// @flow

// #region imports
const DatetimeSchema = require('../datetime/schema');
// #endregion

// #region types definition
const BlogSchema = /* GraphQL */ `
  type Blog {
    id: ID!
    title: String!
    subtitle: String
    summary: String!
    md_content: String!
    date_publication: DateTime!
    author: String!
  }
`;

module.exports = [BlogSchema, ...DatetimeSchema];
