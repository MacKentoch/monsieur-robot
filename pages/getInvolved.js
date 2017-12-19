// @flow

// #region imports
import React, { PureComponent } from 'react';
import Router from 'next/router';
import { compose, bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../HOC/withRoot';
import Layout from '../components/layout/Layout';
import configureStore from '../redux/store/configureStore';
// #endregion

// #region flow types
type InitialProps = {
  req: any,
  res: any,
  pathname: string,
  query: any,
  asPath: string,
  isServer: boolean,
  store?: any,
  ...any,
};

type Props = {
  // withStyle HOC
  classes: any,
  // initialProps
  pathname: string,
  ...any,
};

type State = {
  ...any,
};
// #endregion

// #region styles
const styles = theme => ({
  // to add
});
// #endregion

class GetInvolved extends PureComponent<Props, State> {
  // #region next initialProps
  static getInitialProps({ pathname }: InitialProps) {
    return { pathname };
  }
  // #endregion

  // #region component lifecycle methods
  render() {
    const { pathname } = this.props;

    return (
      <Layout pathname={pathname}>
        <Typography type="display1" gutterBottom>
          Get involved
        </Typography>

        <Typography type="subheading" gutterBottom>
          to add more content
        </Typography>
        <Button raised color="primary" onClick={this.handleClick}>
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
const mapStateToProps = (state: any) => ({
  // to define
});

const mapDispatchToProps = (dispatch: (...any) => any) => {
  return {
    ...bindActionCreators(
      {
        // to define
      },
      dispatch,
    ),
  };
};
// #endregion

// #region compose all HOC
const ComposedGetInvolved = compose(
  withRoot,
  withStyles(styles),
  withRedux(configureStore, mapStateToProps, mapDispatchToProps),
)(GetInvolved);
// #endregion

export default ComposedGetInvolved;
