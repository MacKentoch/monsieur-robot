// @flow

// #region imports
import React, { PureComponent } from 'react';
import Router from 'next/router';
import { compose, bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../HOC/withRoot';
import NavMenus from '../components/navigationMenu/NavigationMenu';
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
  contentContainer: {
    margin: '20px 20%',
  },
});
// #endregion

class Press extends PureComponent<Props, State> {
  // #region next initialProps
  static getInitialProps({ pathname }: InitialProps) {
    return { pathname };
  }
  // #endregion

  // #region component lifecycle methods
  render() {
    const { classes } = this.props;

    return (
      <Layout pathname={'/press'} navigationMenus={<NavMenus />}>
        <div className={classes.contentContainer}>
          <Grid container spacing={24}>
            {/* left content */}
            <Grid xs={12}>
              <div className={styles.ourProjectContainer}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Typography type="title" gutterBottom>
                      Our projects
                    </Typography>
                    <div>
                      <Typography type="body1" gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Etiam facilisis nisl sed justo egestas, at fringilla sem
                        accumsan. Etiam bibendum viverra tristique. Fusce id
                        vehicula sapien. Nullam porta, justo a interdum
                        tincidunt, est nisl hendrerit metus, vitae pharetra
                        lorem tellus eu elit. Vivamus imperdiet rutrum nibh, sit
                        amet semper nisl maximus eget. Vestibulum ante ipsum
                        primis in faucibus orci luctus et ultrices posuere
                        cubilia Curae; Sed lobortis purus nec condimentum
                        consequat. Phasellus in nibh sed odio pellentesque
                        blandit accumsan ac nisl. Donec at nulla elementum,
                        tempus turpis ut, congue nisl. Etiam aliquam, arcu at
                        posuere malesuada, sem est lacinia eros, vitae blandit
                        justo elit non arcu. Ut nec pretium risus. Aliquam
                        fermentum pulvinar maximus. Fusce ipsum leo, ornare in
                        leo vel, dapibus sollicitudin massa. Ut consectetur
                        justo id pretium consequat. Suspendisse ipsum augue,
                        faucibus lobortis felis vel, vestibulum malesuada neque.
                        Phasellus justo mi, efficitur id libero eu, hendrerit
                        tempus nulla. Morbi lacus turpis, feugiat vel tellus eu,
                        dapibus vehicula ex. Ut nec dui lectus. Nunc in
                        dignissim neque.
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <Grid container spacing={24}>
                {/* what is the fides project */}
                <Grid item md={6} sm={6} xs={12}>
                  <Typography type="title" gutterBottom>
                    What is the Fides Project
                  </Typography>
                  <Typography type="body1" gutterBottom align="left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Typography>
                  <Button
                    onClick={
                      this.routeTo('/about') // raised
                    }
                  >
                    learn more about the fides project
                  </Button>
                </Grid>
                {/* why does provacy matters */}
                <Grid item md={6} sm={6} xs={12}>
                  <Typography type="title" gutterBottom>
                    Why does privacy matters
                  </Typography>
                  <Typography type="body1" gutterBottom align="left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Typography>
                  <Button
                    onClick={
                      this.routeTo('/getInvolved') // raised
                    }
                  >
                    get involved with the fides project
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Layout>
    );
  }
  // #endregion

  handleClick = () => {
    Router.push('/');
  };

  // #region click events to route to specific pathname
  routeTo = (pathname: string) => (event: SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }
    Router.push({ pathname });
  };
  // #endregion
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
)(Press);
// #endregion

export default ComposedAbout;
