// @flow

// #region imports
import React, { PureComponent } from 'react';
// import Router                from 'next/router';
import Link from 'next/link';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InfoIcon from 'material-ui-icons/Info';
import MailOutlineIcon from 'material-ui-icons/MailOutline';
import HomeIcon from 'material-ui-icons/Home';
import Typography from 'material-ui/Typography';
import ArticleIcon from 'material-ui-icons/Subject';
import PressIcon from 'material-ui-icons/LocalSee';
import Divider from 'material-ui/Divider';
import ContactIcon from 'material-ui-icons/PermContactCalendar';
import styles from './styles';
// #endregion

// #region flow types
type Props = {
  // from withStyle HOC:
  classes: any,

  ...any,
};

type State = {
  ...any,
};
// #endregion

class AboutMenus extends PureComponent<Props, State> {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography
          className={classes.menuTitle}
          type="subheading"
          gutterBottom
        >
          Main menu (About)
        </Typography>
        {/* Home */}
        <Link prefetch href={'/'} passHref>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'About menu 1'} />
          </ListItem>
        </Link>
        {/* About  */}
        <Link prefetch href={'/about'} passHref>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={'About menu 2'} />
          </ListItem>
        </Link>
        {/* Blog */}
        <Link prefetch href={'/blog'} passHref>
          <ListItem button>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary={'Blog'} />
          </ListItem>
        </Link>
        {/* NewsLetter */}
        <Link prefetch href={'/newsletter'} passHref>
          <ListItem button>
            <ListItemIcon>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={'About menu 3'} />
          </ListItem>
        </Link>
        {/* Press */}
        <Link prefetch href={'/press'} passHref>
          <ListItem button>
            <ListItemIcon>
              <PressIcon />
            </ListItemIcon>
            <ListItemText primary={'About menu 4'} />
          </ListItem>
        </Link>
        {/* Contact */}
        <Link prefetch href={'/contact'} passHref>
          <ListItem button>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary={'About menu 5'} />
          </ListItem>
        </Link>
        <Divider />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AboutMenus);
