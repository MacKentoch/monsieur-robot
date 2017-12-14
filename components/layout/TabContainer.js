// @flow

// #region imports
import React, {
  PureComponent
}                     from 'react';
// #endregion

// #region flow types
type State = any;

type Props = {
  ...any
}
// #endregion

class TabContainer extends PureComponent<Props, State> {
  // #region lifecycle
  render() {
    const { children } = this.props;

    return (
      <div
        style={{
          padding: 8 * 3,
          display: 'flex',
          flex: 1
        }}
      >
        { children }
      </div>
    );
  }
}

export default TabContainer;
