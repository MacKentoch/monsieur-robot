// @flow

// @flow

// #region imports
import React, {
  PureComponent
}                     from 'react';
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
}                     from 'material-ui/Card';
import Button         from 'material-ui/Button';
import Typography     from 'material-ui/Typography';
import classes        from './styles';
import { Tweet }      from 'react-twitter-widgets';
// #endregion

// #region flow types
type State = any;

type Props = {
  id: number | string,
  title: string,
  subtitle?: string,
  sumUp: string,
  tweetId: string,

  ...any
}
// #endregion

class NewsCard extends PureComponent<Props, State> {
  // #region lifecycle
  render() {
    const {
      id,
      title,
      subtitle,
      sumUp
    } = this.props;

    const mockTweetId= '939235471942615040';

    return (
      <Card
        className={classes.cardContainer}
      >
        <CardContent
          className={classes.content}
        >
          <Typography
            type="headline"
          >
            { title }
          </Typography>

          <Typography
            type="subheading"
            color="secondary"
          >
            { subtitle }
          </Typography>

          <Typography
            type="body2"
          >
            { sumUp }
          </Typography>

          <Tweet
            tweetId={mockTweetId}
          />
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

export default NewsCard;
