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
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.palette.primary[600],
  },
  tabs: {
    zIndex: 1000,
    position: 'absolute',
    marginTop: 56,
    width: '100%',
    backgroundColor: theme.palette.primary[600],
    color: '#FFF',
    [theme.breakpoints.up('md')]: {
      width: 'calc(100%)',
      marginTop: 64,
    },
    boxShadow: theme.shadows[2],
  },
  drawerHeader: theme.mixins.toolbar,
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
    marginTop: 56 + 48,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px - 48px)',
      marginTop: 64 + 48,
    },
  },
});

export default styles;
