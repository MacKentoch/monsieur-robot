// @flow

// #region imports
import React, {
  PureComponent
}                     from 'react';
import Typography     from 'material-ui/Typography';
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
      <Typography
        component="div"
        style={{ padding: 8 * 3 }}
      >
        { children }
      </Typography>
    );
  }
}

export default TabContainer;
