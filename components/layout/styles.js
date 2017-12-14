// @flow

// const drawerWidth = 240;
// const tabHeight = 48;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    // marginTop: theme.spacing.unit * 3,
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
    position: 'fixed',
    width: '100%',
    backgroundColor: theme.palette.primary[600],
  },
  topTitle: {
    zIndex: 1001,
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
      marginTop: 64 -1, // removing 1 px: fixing mobile render delta
      paddingLeft: '70px',
    },

  },
  tabs: {
    zIndex: 1000,
    position: 'absolute',
    marginTop: 56 + 160 - 1, // removing 1 px: fixing mobile render delta
    width: '100%',
    backgroundColor: theme.palette.primary[600],
    color: '#FFF',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100%)',
      marginTop: 64  + 160 -1, // removing 1 px: fixing mobile render delta
    },
    boxShadow: theme.shadows[0],
  },
  tabsFixed: {
    zIndex: 1000,
    position: 'fixed',
    marginTop: 56 - 1, // removing 1 px: fixing mobile render delta
    width: '100%',
    backgroundColor: theme.palette.primary[600],
    color: '#FFF',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100%)',
      marginTop: 64 -1, // removing 1 px: fixing mobile render delta
    },
    boxShadow: theme.shadows[2],
  },
  hide: {
    opacity: 0
  },
  // searchFabButton: {
  //   position: 'absolute',
  //   right: '20px',
  //   top: 56 + 48 - 25,
  //   [theme.breakpoints.up('md')]: {
  //     top: 64 + 48 - 25,
  //   },
  //   zIndex: 10000
  // },
  // searchFabButtonFixed: {
  //   position: 'fixed',
  //   right: '20px',
  //   top: 56 + 48 - 25,
  //   [theme.breakpoints.up('md')]: {
  //     top: 64 + 48 - 25,
  //   },
  //   zIndex: 1000
  // },
  drawerHeader: {
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.primary[600], // '#111',
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
    height: '100%',
    width: 250,
  },
  flexible: {
    flex: 1
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
});

export default styles;
