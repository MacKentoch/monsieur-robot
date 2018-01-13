// @flow

// #region imports
const DatetimeSchema = require('../datetime/schema');
// #endregion

// #region types definition
const NewsletterSchema = /* GraphQL */ `
  type NewsLetter {
    id: ID!
    md_content: String!
    submission_date: DateTime,
    creation_date: DateTime!
  }
`;

module.exports = [NewsletterSchema, ...DatetimeSchema];
