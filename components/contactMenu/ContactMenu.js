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

class ContactMenus extends PureComponent<Props, State> {
  // #region lifecycle methods
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography
          className={classes.menuTitle}
          type="subheading"
          gutterBottom
        >
          Main menu (Contact)
        </Typography>
        {/* Contact */}
        <Link prefetch href={'/contact'} passHref>
          <ListItem button>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary={'Contact'} />
          </ListItem>
        </Link>
        {/* Contact  */}
        <Link prefetch href={'/contact'} passHref>
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={'Contact menu 2'} />
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
            <ListItemText primary={'Contact menu 3'} />
          </ListItem>
        </Link>
        {/* Press */}
        <Link prefetch href={'/press'} passHref>
          <ListItem button>
            <ListItemIcon>
              <PressIcon />
            </ListItemIcon>
            <ListItemText primary={'Contact menu 4'} />
          </ListItem>
        </Link>
        {/* Contact */}
        <Link prefetch href={'/contact'} passHref>
          <ListItem button>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary={'Contact menu 5'} />
          </ListItem>
        </Link>
        <Divider />
      </div>
    );
  }
  // #endregion

  // #region on menu clicl : scroll to

  // #endregion
}

export default withStyles(styles, { withTheme: true })(ContactMenus);
