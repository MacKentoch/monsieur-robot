// @flow

// #region imports
import React, { PureComponent } from 'react';
// import Router                from 'next/router';
import Link from 'next/link';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import styles from './styles';
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
  paths: Array<Path>,

  ...any,
};

type State = {
  ...any,
};
// #endregion

class Breadcrumb extends PureComponent<Props, State> {
  render() {
    const { classes, paths } = this.props;

    return (
      <div>
        {paths.map(({ label, link }, pathIdx) => (
          <Link key={`path-${pathIdx}`} to={link}>
            <Typography type="body1">{label}</Typography>
          </Link>
        ))}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Breadcrumb);
