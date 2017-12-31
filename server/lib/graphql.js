// @flow

// #region imports
const { formatError } = require('graphql');
// #endregion

exports.formatGraphqlError = error => {
  const data = formatError(error);
  const { originalError } = error;
  data.field = originalError && originalError.field;
  data.code = originalError && originalError.code;
  return data;
};

exports.GraphqlError = class GraphqlError extends Error {
  constructor(code, ...params) {
    super(...params);
    this.code = code;
  }
};
