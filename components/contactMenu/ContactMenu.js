// @flow

// #region imports
import React, { PureComponent, SyntheticEvent } from 'react';
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
        <ListItem button onclick={this.scrollTo('#contactTop')}>
          <ListItemIcon>
            <ContactIcon />
          </ListItemIcon>
          <ListItemText primary={'Contact'} />
        </ListItem>

        {/* Contact  */}
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={'Contact menu 2'} />
        </ListItem>

        {/* Blog */}
        <ListItem button>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary={'Blog'} />
        </ListItem>

        {/* NewsLetter */}
        <ListItem button>
          <ListItemIcon>
            <MailOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={'Contact menu 3'} />
        </ListItem>

        {/* Press */}
        <ListItem button>
          <ListItemIcon>
            <PressIcon />
          </ListItemIcon>
          <ListItemText primary={'Contact menu 4'} />
        </ListItem>

        {/* Contact */}
        <ListItem button>
          <ListItemIcon>
            <ContactIcon />
          </ListItemIcon>
          <ListItemText primary={'Contact menu 5'} />
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
    if (!toElementId.length > 0) {
    }
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
