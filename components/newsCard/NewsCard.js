// @flow

// @flow

// #region imports
import React, { PureComponent } from 'react';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import styles from './styles';
import { Tweet } from 'react-twitter-widgets';
// #endregion

// #region flow types
type State = any;

type Props = {
  id: number | string,
  title: string,
  subtitle?: string,
  sumUp: string,
  tweetId: string,

  showSumUp: boolean,

  ...any,
};
// #endregion

class NewsCard extends PureComponent<Props, State> {
  static defaultProps = {
    showSumUp: true,
  };

  // #region lifecycle
  render() {
    const { title, subtitle, sumUp, showSumUp, classes } = this.props;

    return (
      <Card>
        <CardContent className={classes.content}>
          <Typography type="headline">{title}</Typography>

          <Typography type="subheading" color="secondary">
            {subtitle}
          </Typography>

          {showSumUp && <Typography type="body2">{sumUp}</Typography>}
        </CardContent>
        <CardActions>
          <Button dense color="primary">
            Share
          </Button>
          <Button dense color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewsCard);
