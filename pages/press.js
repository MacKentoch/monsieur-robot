// @flow

// #region imports
import React, {
  PureComponent
}                             from 'react';
import Router                 from 'next/router';
import {
  compose,
  bindActionCreators
}                             from 'redux';
import withRedux              from 'next-redux-wrapper';
import Button                 from 'material-ui/Button';
import Typography             from 'material-ui/Typography';
import { withStyles }         from 'material-ui/styles';
import withRoot               from '../HOC/withRoot';
import Layout                 from '../components/layout/Layout';
import configureStore         from '../redux/store/configureStore';
// #endregion

// #region flow types
type Props = {
  classes: any,
  ...any
};

type State = {
  ...any
};
// #endregion

// #region styles
const styles = theme => ({
  // to add
});
// #endregion

class Press extends PureComponent<Props, State> {
  // #region component lifecycle methods
  render() {
    return (
      <Layout>
        <Typography
          type="display1"
          gutterBottom
        >
          Press
        </Typography>

        <Typography
          type="subheading"
          gutterBottom
        >
          to add more content
        </Typography>
        <Button
          raised
          color="primary"
          onClick={this.handleClick}
        >
          Go back Home
        </Button>
      </Layout>
    );
  }
  // #endregion

  handleClick = () => {
    Router.push('/');
  };
}


// #region redux state and dispatch map to props
const mapStateToProps = (
  state: any
) => ({
  // to define
});

const mapDispatchToProps = (
  dispatch: (...any) => any
) => {
  return {
    ...bindActionCreators(
      {
        // to define
      },
      dispatch)
  };
};
// #endregion

// #region compose all HOC
const ComposedAbout = compose(
  withRoot,
  withStyles(styles),
  withRedux(
    configureStore,
    mapStateToProps,
    mapDispatchToProps
  )
)(Press);
// #endregion

export default ComposedAbout;
