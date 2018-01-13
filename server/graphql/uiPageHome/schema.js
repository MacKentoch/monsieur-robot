// @flow

// #region imports
const DatetimeSchema = require('../datetime/schema');
// #endregion

// #region types definition
const UiPageHomeSchema = /* GraphQL */ `
  type UIPageHome {
    ui_part_key: String!
    title: String!
    md_content: String!
    edit_date: DateTime!
  }
`;

module.exports = [UiPageHomeSchema, ...DatetimeSchema];
