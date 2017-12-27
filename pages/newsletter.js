// @flow

// #region imports
import React, { PureComponent, SyntheticEvent } from 'react';
import Router from 'next/router';
import { compose, bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import withRoot from '../HOC/withRoot';
import Layout from '../components/layout/Layout';
import NavMenus from '../components/navigationMenu/NavigationMenu';
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
  // input fields
  firstname: string,
  lastname: string,
  email: string,

  ...any,
};
// #endregion

// #region styles
const styles = theme => ({
  root: {},
  contentContainer: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
  },
  nameContainer: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
  },
  formInput: {
    margin: theme.spacing.unit,
    width: '390px',
  },
  formInputEmail: {
    margin: theme.spacing.unit,
    width: '800px',
  },
  formInputInfoText: {
    width: '800px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  joinButtonContainer: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    marginTop: '30px',
  },
});
// #endregion

class NewsLetter extends PureComponent<Props, State> {
  // #region next initialProps
  static getInitialProps({ pathname }: InitialProps) {
    return { pathname };
  }
  // #endregion

  // #region state initialization
  state = {
    // input fields
    firstname: '',
    lastname: '',
    email: '',
  };
  // #endregion

  // #region component lifecycle methods
  render() {
    const { pathname, classes } = this.props;
    const { firstname, lastname, email } = this.state;

    return (
      <Layout pathname={pathname} navigationMenus={<NavMenus />}>
        <Typography type="display1" gutterBottom>
          Signup for the Fides Project news
        </Typography>
        <div className={classes.contentContainer}>
          <div className={classes.nameContainer}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-simple">First Name</InputLabel>
              <Input
                id="firstname"
                value={firstname}
                className={classes.formInput}
                onChange={this.handlesInpuntChange('fistname')}
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-simple">Last Name</InputLabel>
              <Input
                id="lastname"
                value={lastname}
                className={classes.formInput}
                onChange={this.handlesInpuntChange('lastname')}
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-simple">Email</InputLabel>
              <Input
                id="email"
                value={email}
                className={classes.formInputEmail}
                onChange={this.handlesInpuntChange('email')}
                fullWidth
              />
            </FormControl>
            <div className={classes.formInputInfoText}>
              <Typography type="body1" gutterBottom>
                The information you provide here will only be used to send you
                updates and opportunities from Tor. You can unsubscribe at any
                time. We will not publish, sell, trade, share, or rent any
                information about you.
              </Typography>
            </div>
          </div>

          <div className={classes.joinButtonContainer}>
            <Button raised color="primary" onClick={this.handleClick}>
              Join
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  // #endregion

  // #region on form input change event
  handlesInpuntChange = (field: string = '') => (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
  };
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
)(NewsLetter);
// #endregion

export default ComposedAbout;
