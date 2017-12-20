// @flow

// #region imports
import React, { PureComponent } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import cx from 'classnames';
// import Router                 from 'next/router';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Hidden from 'material-ui/Hidden';
import Tabs, { Tab } from 'material-ui/Tabs';
// import Button                 from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
// import Hidden                 from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Search from 'material-ui-icons/Search';
import MenuIcon from 'material-ui-icons/Menu';
import NavMenus from './NavMenus';
import styles from './styles';
import appConfig from '../../config/appConfig';
import TabContainer from './TabContainer';
// import BackToTop              from '../backToTop/BackToTop';
// #endregion

// #region flow types
type Props = {
  // parent:
  children: ReactNode,
  pathname: string,
  // withStyle injected
  classes: any,
  theme: any,
};

type State = {
  mobileOpen: boolean,
  anchorEl: any,
  // from parent
  currentTab: string,
  // deduced from currentTab
  pageTitle: string,

  // scroll spy (to toggle top nav classes)
  minScrollYToggleNav: number,
  windowScrollY: number, // current window y scroll
  tickingScollObserve: boolean, // performance improvement (let requestAnimation frame reduce onscroll listening)
  toggleTopNavClasses: boolean, // toggle top nav items classes depending scroll
};
// #endregion

// #region constants
const { tabMenu, defautTabMenuId } = appConfig.navigation;
// #endregion

class LayoutWithDrawer extends PureComponent<Props, State> {
  // #region state initialization
  state = {
    mobileOpen: false,
    anchorEl: null,
    currentTab: defautTabMenuId,
    pageTitle: '',
    // scroll spy (to toggle top nav classes)
    minScrollYToggleNav: 155,
    minScrollYHideTitle: 40,
    windowScrollY: 0,
    tickingScollObserve: false,
    toggleTopNavClasses: false,
    fadeTitleContainer: false,
  };
  // #endregion

  // #region component lifecycle methods
  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.initializeToggleClasses();
      window.addEventListener('scroll', this.handleWindowScroll);
    }
    const { pathname } = this.props;
    this.initizeTabsStateAndTitle(pathname);
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
      children,
    } = this.props;

    const {
      anchorEl,
      currentTab,
      pageTitle,
      // scroll spy
      toggleTopNavClasses,
      fadeTitleContainer,
    } = this.state;

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <div className={classes.avatarContainer}>
            <Avatar src="/static/images/fsociety-avatar.jpg" size="40px" />
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
          <AppBar className={classes.appBar} elevation={0}>
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
              <Typography type="title" color="inherit" noWrap>
                Monsieur Robot
              </Typography>

              {/* a filler */}
              <div className={classes.flexible} />

              {/* right actions */}
              <div>
                <Link prefetch href={'/login'} passHref>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleOnSearch}
                    color="contrast"
                  >
                    <Search />
                  </IconButton>
                </Link>
              </div>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
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
          <div
            className={cx({
              [classes.topTitle]: true,
            })}
          >
            <Typography type="display3" gutterBottom color="#FFFFFF">
              <span
                className={cx({
                  [classes.show]: !fadeTitleContainer,
                  [classes.hide]: fadeTitleContainer,
                })}
                style={{ color: '#FFFFFF' }}
              >
                {pageTitle}
              </span>
            </Typography>
          </div>
          <Tabs
            className={cx({
              [classes.tabs]: !toggleTopNavClasses,
              [classes.tabsFixed]: toggleTopNavClasses,
            })}
            value={currentTab}
            onChange={this.handleOnTabChange}
            fullWidth={false}
            indicatorColor="#FFF"
            scrollable
            scrollButtons="auto"
          >
            {tabMenu.map(({ id, label }, menuIdx: number) => (
              <Tab key={`tab-menu-${id}-${menuIdx}`} value={id} label={label} />
            ))}
          </Tabs>
          <TabContainer>
            <main id="appContainer" className={classes.content}>
              {children}
            </main>
          </TabContainer>
          {/* <BackToTop
            minScrollY={40}
            scrollTo={'appContainer'}
          /> */}
        </div>
      </div>
    );
  }
  // #endregion

  // #region init classes depending scroll y
  initializeToggleClasses() {
    if (window) {
      const { minScrollYToggleNav, minScrollYHideTitle } = this.state;
      /* eslint-disable no-undefined */
      const currentWindowScrollY =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      /* eslint-enable no-undefined */
      const shouldToggleTopNavClasses =
        currentWindowScrollY >= minScrollYToggleNav;
      const shouldHideTitle = currentWindowScrollY >= minScrollYHideTitle;

      this.setState({
        windowScrollY: currentWindowScrollY,
        toggleTopNavClasses: shouldToggleTopNavClasses,
        fadeTitleContainer: shouldHideTitle,
      });
    }
  }
  // #endregion

  // #region initialize tab state (next js won't persist state accross navigation)
  initizeTabsStateAndTitle(pathname: string) {
    const currentPage = tabMenu.find(tab => tab.id === pathname);
    const pageTitle = currentPage ? currentPage.pageTitle : '';
    this.setState({
      currentTab: pathname,
      pageTitle,
    });
  }
  // #endregion

  // #region on windows scroll callback
  handleWindowScroll = () => {
    if (window) {
      const {
        minScrollYToggleNav,
        minScrollYHideTitle,
        windowScrollY,
        tickingScollObserve,
      } = this.state;

      /* eslint-disable no-undefined */
      const currentWindowScrollY =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      /* eslint-enable no-undefined */
      // scroll event fires too often, using window.requestAnimationFrame to limit computations
      if (!tickingScollObserve) {
        window.requestAnimationFrame(() => {
          if (windowScrollY !== currentWindowScrollY) {
            const shouldToggleTopNavClasses =
              currentWindowScrollY >= minScrollYToggleNav;
            const shouldHideTitle = currentWindowScrollY >= minScrollYHideTitle;

            this.setState({
              windowScrollY: currentWindowScrollY,
              toggleTopNavClasses: shouldToggleTopNavClasses,
              fadeTitleContainer: shouldHideTitle,
            });
          }
          this.setState({ tickingScollObserve: false });
        });
      }
      this.setState({ tickingScollObserve: true });
    }
  };
  // #endregion

  // #region on tab click event
  handleOnTabChange = (event: SyntheticEvent<>, value: any) => {
    const selectedTab = tabMenu.find(tab => tab.id === value);
    this.setState({ currentTab: selectedTab.id });
    Router.push(selectedTab.link);
  };
  // #endregion

  // #region drawer management
  handleDrawerToggle = () =>
    this.setState(({ mobileOpen: prevMobileOpen }: State) => ({
      mobileOpen: !prevMobileOpen,
    }));
  // #endregion

  // #region appBar action menu
  handleOnSearch = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
    console.log('TODO: on search event to implement');
  };
  // #endregion
}

// #region redux state and dispatch map to props
const mapStateToProps = (state: any) => ({
  // to add if needed
});

const mapDispatchToProps = (dispatch: (...any) => any) => {
  return {
    ...bindActionCreators(
      {
        // to add if needed
      },
      dispatch,
    ),
  };
};
// #endregion

const ComposedLayoutWithDrawer = compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
)(LayoutWithDrawer);

export default ComposedLayoutWithDrawer;
