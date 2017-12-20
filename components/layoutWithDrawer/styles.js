// @flow

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    zIndex: 1500,
    position: 'fixed',
    width: '100%',
    backgroundColor: theme.palette.primary[600],
  },
  topTitle: {
    zIndex: 1400,
    opacity: 1,
    backgroundColor: theme.palette.primary[600],
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    height: '160px',
    width: 'calc(100%)',
    padding: '0 10px',
    textAlign: 'center',
    color: '#FFF',
    marginTop: 56 - 1, // removing 1 px: fixing mobile render delta
    [theme.breakpoints.up('md')]: {
      width: 'calc(100%)',
      marginTop: 64 - 1, // removing 1 px: fixing mobile render delta
      paddingLeft: '70px',
    },
  },
  tabs: {
    zIndex: 1400,
    position: 'absolute',
    marginTop: 56 + 160 - 1, // removing 1 px: fixing mobile render delta
    width: '100%',
    backgroundColor: theme.palette.primary[600],
    color: '#FFF',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100%)',
      marginTop: 64 + 160 - 1, // removing 1 px: fixing mobile render delta
    },
    boxShadow: theme.shadows[0],
  },
  tabsFixed: {
    zIndex: 1400,
    position: 'fixed',
    marginTop: 56 - 1, // removing 1 px: fixing mobile render delta
    width: '100%',
    backgroundColor: theme.palette.primary[600],
    color: '#FFF',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100%)',
      marginTop: 64 - 1, // removing 1 px: fixing mobile render delta
    },
    boxShadow: theme.shadows[2],
  },
  show: {
    WebkitTransition: 'opacity 0.5s ease-in',
    transition: 'opacity 0.5s ease-in',
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawer: {
    height: '100%',
    backgroundColor: 'transparent',
    marginTop: 56 + 160 + 48 + 10,
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 64px - 48px)',
      marginTop: 64 + 160 + 48 + 10,
    },
  },
  drawerMenu: {
    backgroundColor: 'transparent',
  },
  avatarContainer: {
    display: 'flex',
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 0,
    height: 'calc(56px + 48px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(64px + 48px)',
    },
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: '0 10px',
  },
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px - 48px)',
    marginTop: 56 + 160 + 48,
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 64px - 48px)',
      marginTop: 64 + 160 + 48,
    },
  },
  flexible: {
    flex: 1,
  },
});

export default styles;
