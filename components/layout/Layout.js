// @flow

// #region imports
import React, {
  PureComponent
}                             from 'react';
import {
  compose,
  bindActionCreators
}                             from 'redux';
import { connect }            from 'react-redux';
import Link                   from 'next/link';
import Router                 from 'next/router';
import { withStyles }         from 'material-ui/styles';
import Drawer                 from 'material-ui/Drawer';
import AppBar                 from 'material-ui/AppBar';
import Tabs, { Tab }          from 'material-ui/Tabs';
import Toolbar                from 'material-ui/Toolbar';
import Typography             from 'material-ui/Typography';
import IconButton             from 'material-ui/IconButton';
import Hidden                 from 'material-ui/Hidden';
import Divider                from 'material-ui/Divider';
import Menu, { MenuItem }     from 'material-ui/Menu';
import AccountCircle          from 'material-ui-icons/AccountCircle';
import MenuIcon               from 'material-ui-icons/Menu';
import Menus                  from './Menus';
import styles                 from './styles';
import appConfig              from '../../config/appConfig';
import TabContainer           from './TabContainer';
// import BackToTop              from '../backToTop/BackToTop';
import * as userAuthActions   from '../../redux/modules/userAuth';
// #endregion

// #region flow types
type Props = {
  children: ReactNode,

  // userAuth:
  isAuthenticated: boolean,
  isFetching: boolean,
  isLogging: boolean,
  disconnectUser: () => string,

  // withStyle injected
  classes: any,
  theme: any,
}

type State = {
  mobileOpen: boolean,
  anchorEl: any,
  currentTab: string
};
// #endregion

// #region constants
const { tabMenu, defautTabMenuId } = appConfig.navigation;
// #endregion


class Layout extends PureComponent<Props, State> {
  // #region state initialization
  state = {
    mobileOpen: false,
    anchorEl: null,
    currentTab: defautTabMenuId
  };
  // #endregion

  // #region component lifecycle methods
  render() {
    const {
      // withStyle HOC:
      classes,
      theme,
      // children:
      children,
      // userAuth
      isAuthenticated
    } = this.props;

    const {
      anchorEl,
      currentTab
    } = this.state;

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <Menus />
        <Divider />
      </div>
    );

    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classes.appBar}
            elevation={0}
          >
            <Toolbar>
              {/* burger menu */}
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>

              {/* title */}
              <Typography
                type="title"
                color="inherit"
                noWrap
              >
                PWA Next Material UI
              </Typography>

              {/* a filler */}
              <div className={classes.flexible} />

              { /* right actions */ }
              {
                isAuthenticated
                  ?
                  (
                    <div>
                      <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="contrast"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={open}
                        onRequestClose={this.handleRequestClose}
                      >
                        <MenuItem
                          onClick={this.handleRequestClose}
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={this.handleRequestClose}
                        >
                          My account
                        </MenuItem>
                        <MenuItem
                          onClick={this.HandlesDisconnectUser}
                        >
                          Disconnect
                        </MenuItem>
                      </Menu>
                    </div>
                  )
                  :
                  (
                    <div>
                      <Link
                        prefetch
                        href={'/login'}
                        passHref
                      >
                        <IconButton
                          aria-owns={open ? 'menu-appbar' : null}
                          aria-haspopup="true"
                          onClick={this.handleMenu}
                          color="contrast"
                        >
                          <AccountCircle />
                        </IconButton>
                      </Link>
                    </div>
                  )
              }
            </Toolbar>
          </AppBar>
          {/* sidemenu small screen: */}
          <Hidden
            mdUp
          >
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onRequestClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          {/* sidemenu medium to large screen: */}
          <Hidden
            mdDown
            implementation="css"
          >
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Tabs
            className={classes.tabs}
            value={currentTab}
            onChange={this.handleChange}
            fullWidth={false}
          >
            {
              tabMenu.map(
                ({ id, label }, menuIdx: number) => (
                  <Tab
                    key={`tab-menu-${id}-${menuIdx}`}
                    value={id}
                    label={label}
                  />
                )
              )
            }
          </Tabs>
          <TabContainer>
            <main
              className={classes.content}
            >
              { children }

            </main>
          </TabContainer>
        </div>
      </div>
    );
  }
  // #endregion

  // #region drawer management
  handleDrawerToggle = () => this.setState(
    ({mobileOpen: prevMobileOpen}: State) => ({ mobileOpen: !prevMobileOpen })
  );
  // #endregion

  // #region appBar action menu
  handleMenu = (event: SyntheticEvent<>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };
  // #endregion

  // #region on disconnect click
  HandlesDisconnectUser = (
    event?: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
    }

    const {
      disconnectUser
    } = this.props;

    disconnectUser();
    Router.replace('/');
  }
  // #endregion
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

const ComposedLayout = compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Layout);

export default ComposedLayout;
