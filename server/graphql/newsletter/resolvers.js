// @flow
/* eslint-disable camelcase */

// #region imports
// const { GraphqlError } = require('../../lib/graphqlErrors');
// const db = require('../../db');
// #endregion

const resolvers = {
  async getNewsletter(/* obj , params, { loaders } */) {
    const mockDate = new Date();
    return [
      {
        md_content: `# fake mad newletter content
        > getNewsletter resolver not implemented yet!
      `,
        submission_date: mockDate,
        creation_date: mockDate,
      },
    ];
  },
};

module.exports = resolvers;
