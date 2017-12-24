// @flow
/* eslint-disable quotes */

// #region imports
import React, { PureComponent } from 'react';
// import Router                from 'next/router';
import Link from 'next/link';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PlayArrow from 'material-ui-icons/PlayArrow';
import styles from './styles';
import Button from 'material-ui/Button';
// #endregion

// #region flow types
type Path = {
  label: string,
  link: string,
};

type Props = {
  // from withStyle HOC:
  classes: any,
  // parent:
  root: Path,
  paths: Array<Path>,

  ...any,
};

type State = {
  ...any,
};
// #endregion

class Breadcrumb extends PureComponent<Props, State> {
  render() {
    const { classes, root, paths } = this.props;
    const { label: rootLabel, link: rootLink } = root;

    return (
      <div className={classes.breadcrumbContainer}>
        {/* root */}
        <Button>
          <Link href={rootLink}>
            <Typography type="body1"> {rootLabel}</Typography>
          </Link>
        </Button>
        {/* sub navigation */}
        {paths.map(({ label, link }, pathIdx) => (
          <div key={`path-${pathIdx}`} className={classes.pathContainer}>
            {/* <Typography type="body1"> {`/ `}</Typography> */}
            <PlayArrow />
            <Button key={`path-${pathIdx}`}>
              <Link href={link}>
                <Typography type="body1"> {label}</Typography>
              </Link>
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Breadcrumb);
