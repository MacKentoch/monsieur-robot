// @flow

// #region imports
import React, { Component } from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';
import withData from '../services/apolloClient';
// #endregion

// #region HOC
function withApollo() {
  return BaseComponent => {
    class WithApollo extends Component<any, any> {
      render() {
        return <BaseComponent {...this.props} />;
      }
    }

    /* eslint-disable no-process-env */
    if (process.env.NODE_ENV !== 'production') {
      // HOC would obfuscate component name, this trick is helpful for dev (we don't care in production)
      WithApollo.displayName = wrapDisplayName(BaseComponent, 'WithApollo');
    }
    return withData(WithApollo);
  };
}
// #endregion

export default withApollo;
