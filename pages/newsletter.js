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
import validate from 'validate.js';
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
  firstnameError?: string,
  lastname: string,
  lastnameError?: string,
  email: string,
  emailError?: string,

  ...any,
};
// #endregion

// #region styles
const styles = theme => ({
  root: {},
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
  },
  nameContainer: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    marginTop: '30px',
  },
  formControl: {
    margin: theme.spacing.unit,
    display: 'flex',
    flex: '1 1 auto',
  },
  formInput: {},
  formInputEmail: {},
  formInputInfoText: {
    display: 'flex',
    flex: '1 1 auto',
    // width: '800px',
    marginTop: '20px',
    marginBottom: '30px',
  },
  formValidationMessage: {
    color: '#D50000',
    marginBottom: '10px',
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

  // #region form field validation contraints
  contraints = {
    firstname: {
      presence: true,
      length: {
        minimum: 3,
        message: 'must be at least 3 characters',
      },
    },
    lastname: {
      presence: true,
      length: {
        minimum: 3,
        message: 'must be at least 3 characters',
      },
    },
    /* eslint-disable quotes */
    email: {
      email: {
        message: `doesn't look like a valid email`,
      },
    },
    /* eslint-enable quotes */
  };
  // #endregion

  // #region state initialization
  state = {
    // input fields
    firstname: '',
    firstnameError: null,

    lastname: '',
    lastnameError: null,

    email: '',
    emailError: null,
  };
  // #endregion

  // #region component lifecycle methods
  render() {
    const { pathname, classes } = this.props;
    const {
      firstname,
      firstnameError,
      lastname,
      lastnameError,
      email,
      emailError,
    } = this.state;

    return (
      <Layout pathname={pathname} navigationMenus={<NavMenus />}>
        <div className={classes.contentContainer}>
          <Typography type="display1" gutterBottom>
            Signup for the Fides Project news
          </Typography>
          <div className={classes.nameContainer}>
            {/* first name and lastname */}
            <Grid container spacing={24}>
              <Grid item md={6} sm={12} xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="name-simple">First Name</InputLabel>
                  <Input
                    id="firstname"
                    value={firstname}
                    className={classes.formInput}
                    onChange={this.handlesInpuntChange('firstname')}
                    fullWidth
                  />
                  <FormHelperText className={classes.formValidationMessage}>
                    {firstnameError}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item md={6} sm={12} xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="name-simple">Last Name</InputLabel>
                  <Input
                    id="lastname"
                    value={lastname}
                    className={classes.formInput}
                    onChange={this.handlesInpuntChange('lastname')}
                    fullWidth
                  />
                  <FormHelperText className={classes.formValidationMessage}>
                    {lastnameError}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            {/* email */}
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="name-simple">Email</InputLabel>
                  <Input
                    id="email"
                    value={email}
                    className={classes.formInputEmail}
                    onChange={this.handlesInpuntChange('email')}
                    fullWidth
                  />
                  <FormHelperText className={classes.formValidationMessage}>
                    {emailError}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

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
            <Button raised color="primary" onClick={this.handlesOnJoin}>
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

      switch (field) {
        case 'firstname':
          // should add some validator before setState in real use cases
          this.setState({ firstname: event.target.value.trim() });
          return;

        case 'lastname':
          // should add some validator before setState in real use cases
          this.setState({ lastname: event.target.value.trim() });
          return;

        case 'email':
          // should add some validator before setState in real use cases
          this.setState({ email: event.target.value.trim() });
          return;

        default:
          return;
      }
    }
  };
  // #endregion

  // #region on join click event
  handlesOnJoin = () => {
    const { firstname, lastname, email } = this.state;

    // validate fields
    const validationFailed = validate(
      { firstname, lastname, email },
      this.contraints,
    );
    if (!validationFailed) {
      // submit

      return;
    }
    // resests error messages
    this.setState({
      firstnameError: null,
      lastnameError: null,
      emailError: null,
    });
    // set errors messages for invalid fields
    Object.keys(validationFailed).forEach(key => {
      const error = validationFailed[key][0];
      this.setState({ [`${key}Error`]: error });
    });
    return;
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
)(NewsLetter);
// #endregion

export default ComposedAbout;
