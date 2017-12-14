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
import cx                     from 'classnames';
// import Router                 from 'next/router';
import { withStyles }         from 'material-ui/styles';
import Drawer                 from 'material-ui/Drawer';
import AppBar                 from 'material-ui/AppBar';
import Tabs, { Tab }          from 'material-ui/Tabs';
// import Button                 from 'material-ui/Button';
import Toolbar                from 'material-ui/Toolbar';
import Typography             from 'material-ui/Typography';
import IconButton             from 'material-ui/IconButton';
import Avatar                 from 'material-ui/Avatar';
// import Hidden                 from 'material-ui/Hidden';
import Divider                from 'material-ui/Divider';
import Search                 from 'material-ui-icons/Search';
import MenuIcon               from 'material-ui-icons/Menu';
import NavMenus               from './NavMenus';
import styles                 from './styles';
import appConfig              from '../../config/appConfig';
import TabContainer           from './TabContainer';
// import BackToTop              from '../backToTop/BackToTop';
import * as userAuthActions   from '../../redux/modules/userAuth';
// #endregion

// #region flow types
type Props = {
  children: ReactNode,

  // withStyle injected
  classes: any,
  theme: any,
}

type State = {
  mobileOpen: boolean,
  anchorEl: any,
  currentTab: string,

  // scroll spy (to toggle top nav classes)
  minScrollY: number,
  windowScrollY: number, // current window y scroll
  tickingScollObserve: boolean, // performance improvement (let requestAnimation frame reduce onscroll listening)
  toggleTopNavClasses: boolean, // toggle top nav items classes depending scroll
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
    currentTab: defautTabMenuId,
    // scroll spy (to toggle top nav classes)
    minScrollY: 145,
    windowScrollY: 0,
    tickingScollObserve: false,
    toggleTopNavClasses: false,
  };
  // #endregion

  // #region component lifecycle methods
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleWindowScroll);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleWindowScroll);
    }
  }

  render() {
    const {
      // withStyle HOC:
      classes,
      theme,
      // children:
      children
    } = this.props;

    const {
      anchorEl,
      currentTab,
      // scroll spy
      toggleTopNavClasses
    } = this.state;

    const drawer = (
      <div>
        <div
          className={classes.drawerHeader}
        >
          <div
            className={classes.avatarContainer}
          >
            <Avatar
              src="/static/images/fsociety-avatar.jpg"
              size="40px"
            />
          </div>
        </div>
        <Divider />
        <NavMenus />
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
                // className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>

              {/* title */}
              <Typography
                type="title"
                color="inherit"
                noWrap
              >
                Monsieur Robot
              </Typography>

              {/* a filler */}
              <div className={classes.flexible} />

              { /* right actions */ }
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
                    <Search />
                  </IconButton>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            // type="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onRequestClose={this.handleDrawerToggle}
            // ModalProps={{
            //   keepMounted: true, // Better open performance on mobile.
            // }}
          >
            {drawer}
          </Drawer>
          <div
            className={
              cx({
                [classes.topTitle]: true,
                [classes.hide]: toggleTopNavClasses,
              })
            }
          >
            <Typography
              type="display3"
              gutterBottom
              color="#FFFFFF"
            >
              <span
                style={{ color: '#FFFFFF' }}
              >
                View title here
              </span>
            </Typography>
          </div>
          <Tabs
            className={
              cx({
                [classes.tabs]: !toggleTopNavClasses,
                [classes.tabsFixed]: toggleTopNavClasses,
              })
            }
            value={currentTab}
            onChange={this.handleChange}
            fullWidth={false}
            indicatorColor="#FFF"
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

  // #region on windows scroll callback
  handleWindowScroll = () => {
    if (window) {
      const {
        minScrollY,
        windowScrollY,
        tickingScollObserve
      } = this.state;

      /* eslint-disable no-undefined */
      const currentWindowScrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      /* eslint-enable no-undefined */
      // scroll event fires too often, using window.requestAnimationFrame to limit computations
      if (!tickingScollObserve) {
        window.requestAnimationFrame(
          () => {
            if (windowScrollY !== currentWindowScrollY) {
              const shouldToggleTopNavClasses = currentWindowScrollY >= minScrollY ? true : false;

              this.setState({
                windowScrollY: currentWindowScrollY,
                toggleTopNavClasses: shouldToggleTopNavClasses
              });
            }
            this.setState({ tickingScollObserve: false });
          }
        );
      }
      this.setState({ tickingScollObserve: true });
    }
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
