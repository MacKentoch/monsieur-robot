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
import Typography     from 'material-ui/Typography';
import classes        from './styles';
// #endregion

// #region flow types
type State = any;

type Props = {
  id: number | string,
  title: string,
  subtitle?: string,
  sumUp: string,

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
        </CardContent>
      </Card>
    );
  }
}

export default NewsCard;
