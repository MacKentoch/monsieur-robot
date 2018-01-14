// @flow

// #region imports
import React, { PureComponent } from 'react';
import Router from 'next/router';
import { compose, bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import withRoot from '../HOC/withRoot';
import NavigationMenu from '../components/navigationMenu/NavigationMenu';
import ContactMenu from '../components/contactMenu/ContactMenu';
import LayoutWithDrawer from '../components/layoutWithDrawer/LayoutWithDrawer';
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

class Contact extends PureComponent<Props, State> {
  // #region next initialProps
  static getInitialProps({ pathname }: InitialProps) {
    return { pathname };
  }
  // #endregion

  // #region component lifecycle methods
  render() {
    return (
      <LayoutWithDrawer
        pathname={'/contact'}
        sceneSubMenus={<ContactMenu />}
        navigationMenus={<NavigationMenu />}
      >
        <div id="contactSection">
          <Typography type="display1" gutterBottom>
            Contact
          </Typography>
          <List>
            {/* support */}
            <ListItem button>
              <Avatar>
                <FolderIcon />
              </Avatar>
              <ListItemText primary="Support" />
            </ListItem>
            {/* twitter */}
            <ListItem button>
              <Avatar>
                <FolderIcon />
              </Avatar>
              <ListItemText primary="Twitter" />
            </ListItem>
            {/* discord */}
            <ListItem button>
              <Avatar>
                <FolderIcon />
              </Avatar>
              <ListItemText primary="Discord" />
            </ListItem>
            {/* email */}
            <ListItem button>
              <Avatar>
                <FolderIcon />
              </Avatar>
              <ListItemText primary="Email" />
            </ListItem>
          </List>
        </div>

        <Typography type="subheading" gutterBottom>
          to add more content
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
)(Contact);
// #endregion

export default ComposedAbout;
