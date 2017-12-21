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
import LayoutWithDrawer from '../components/layoutWithDrawer/LayoutWithDrawer';
import NavigationMenu from '../components/navigationMenu/NavigationMenu';
import AboutMenu from '../components/aboutMenu/AboutMenu';
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

class About extends PureComponent<Props, State> {
  // #region next initialProps
  static getInitialProps({ pathname }: InitialProps) {
    return { pathname };
  }
  // #endregion

  // #region component lifecycle methods
  render() {
    const { pathname } = this.props;

    return (
      <LayoutWithDrawer
        pathname={pathname}
        sceneSubMenus={<AboutMenu />}
        navigationMenus={<NavigationMenu />}
      >
        <Typography type="display1" gutterBottom>
          About
        </Typography>

        <Typography type="subheading" gutterBottom>
          example project
        </Typography>
        <Button raised color="primary" onClick={this.handleClick}>
          Go back Home
        </Button>
      </LayoutWithDrawer>
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
const ComposedAbout = compose(
  withRoot,
  withStyles(styles),
  withRedux(configureStore, mapStateToProps, mapDispatchToProps),
)(About);
// #endregion

export default ComposedAbout;
