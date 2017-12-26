// @flow

// #region imports
import React, { PureComponent, SyntheticEvent } from 'react';
// import Router                from 'next/router';
import Link from 'next/link';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MailOutlineIcon from 'material-ui-icons/MailOutline';
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
        <ListItem button onClick={this.scrollTo('')}>
          <ListItemIcon>
            <ContactIcon />
          </ListItemIcon>
          <ListItemText primary={'Contact'} />
        </ListItem>

        {/* Blog (blogSection) */}
        <ListItem button onClick={this.scrollTo('#blogSection')}>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary={'Blog'} />
        </ListItem>

        {/* NewsLetter (newsletterSection) */}
        <ListItem button onClick={this.scrollTo('#newsletterSection')}>
          <ListItemIcon>
            <MailOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={'NewsLetter'} />
        </ListItem>

        {/* Press (pressSection) */}
        <ListItem button onClick={this.scrollTo('#pressSection')}>
          <ListItemIcon>
            <PressIcon />
          </ListItemIcon>
          <ListItemText primary={'Press'} />
        </ListItem>
        <Divider />
      </div>
    );
  }
  // #endregion

  // #region on menu clicl : scroll to
  scrollTo = (toElementId: string = null) => (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
    if (!toElementId) {
      return;
    }
    // no target element = go top page
    if (!toElementId.length > 0) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
    // otherwise smooth scroll to target element
    const startsWithSharp = toElementId.slice(0, 1) === '#';
    const queryEl = startsWithSharp ? toElementId : `#${toElementId}`;
    // using here "smooth scroll polyfill"
    document.querySelector(queryEl).scrollIntoView({
      behavior: 'smooth',
    });
  };
  // #endregion
}

export default withStyles(styles, { withTheme: true })(ContactMenus);
