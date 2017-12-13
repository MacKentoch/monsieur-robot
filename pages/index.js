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
// import BackToTop              from '../backToTop/BackToTop';
import * as userAuthActions   from '../redux/modules/userAuth';
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
const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200
  }
};
// #endregion
class Index extends PureComponent<Props, State> {
  // #region props initialization
  // static async getInitialProps({
  //   isServer,
  //   store
  // }: InitialProps) {
  //   const SIDE = isServer ? 'SERVER SIDE' : 'FRONT SIDE';

  //   try {
  //     const response = await store.dispatch(fakeFetchActions.fakeFetchIfNeeded());
  //     const {
  //       payload: {
  //         data
  //       }
  //     } = response;
  //     // NOTE: you will see this log in your server console (where you `npm run dev`):
  //     /* eslint-disable no-console */
  //     console.log(`getInitialProps - ${SIDE} - fake fetch result: `, data);
  //   } catch (error) {
  //     console.error(`getInitialProps - ${SIDE} - fake fetch failed: `, error);
  //     /* eslint-enable no-console */
  //   }
  // }
  // #endregion


  // #region component lifecycle methods
  render() {
    return (
      <Layout>
        <Typography
          type="display1"
          gutterBottom
        >
          Material-UI
        </Typography>

        <Typography
          type="subheading"
          gutterBottom
        >
          example project
        </Typography>

        <Button
          raised
          color="accent"
          onClick={this.handleClick}
        >
          Login
        </Button>
      </Layout>
    );
  }
  // #endregion

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    Router.push('/login');
  };
}

// #region redux state and dispatch map to props
const mapStateToProps = (
  state: any
) => ({
  // userAuth:
  isAuthenticated: state.userAuth.isAuthenticated,
  isFetching:      state.userAuth.isFetching,
  isLogging:       state.userAuth.isLogging
});

const mapDispatchToProps = (
  dispatch: (...any) => any
) => {
  return {
    ...bindActionCreators(
      {
        // userAuth:
        ...userAuthActions
      },
      dispatch)
  };
};
// #endregion

// #region compose all HOC
const ComposedIndex = compose(
  withRoot,
  withStyles(styles),
  withRedux(
    configureStore,
    mapStateToProps,
    mapDispatchToProps
  )
)(Index);
// #endregion

export default ComposedIndex;
