// @flow

// #region imports
import React, { Component } from 'react';
import { withStyles, MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import getContext from '../styles/getContext';
import registerServiceWorker from '../services/registerServiceWorker';
import registerBeforeinstallprompt from '../services/registerBeforeinstallprompt';
// #endregion

// #region Apply some style reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    body: {
      margin: 0,
    },
  },
});
// #endregion

// #region apply smooth scroll polyfill
if (process.browser) {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();
  // force polyfill
  window.__forceSmoothScrollPolyfill__ = true;
}
// #endregion

// #region AppWrapper component
let AppWrapper = props => props.children;

AppWrapper = withStyles(styles)(AppWrapper);
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
// #endregion

// #region withRoot HOC
function withRoot(BaseComponent) {
  class WithRoot extends Component {
    static getInitialProps(ctx: InitialProps) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx);
      }
      return {};
    }

    // #region lifecycle methods
    componentWillMount() {
      this.styleContext = getContext();
    }

    componentDidMount() {
      // register the service worker (production only):
      registerServiceWorker();
      // register for prompt to install to home screen (production only):
      registerBeforeinstallprompt();

      // restore scroll to top (between naviagtions)
      /* eslint-disable no-undefined */
      if (typeof window !== undefined) {
        window.scrollTo(0, 0);
      }
      /* eslint-enable no-undefined */

      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <MuiThemeProvider
          theme={this.styleContext.theme}
          sheetsManager={this.styleContext.sheetsManager}
        >
          <AppWrapper>
            <BaseComponent {...this.props} />
          </AppWrapper>
        </MuiThemeProvider>
      );
    }
    // #endregion
  }
  /* eslint-disable no-process-env */
  if (process.env.NODE_ENV !== 'production') {
    // HOC would obfuscate component name, this trick is helpful for dev (we don't care in production)
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }
  /* eslint-enable no-process-env */
  return WithRoot;
}
// #endregion

export default withRoot;
