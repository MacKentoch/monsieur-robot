// @flow

// #region imports
import React, {
  PureComponent
}                             from 'react';
import Router                 from 'next/router';
import {
  compose,
  bindActionCreators
}                             from 'redux';
import withRedux              from 'next-redux-wrapper';
import Button                 from 'material-ui/Button';
import Typography             from 'material-ui/Typography';
import Grid                   from 'material-ui/Grid';
import { withStyles }         from 'material-ui/styles';
import withRoot               from '../HOC/withRoot';
import Layout                 from '../components/layout/Layout';
import configureStore         from '../redux/store/configureStore';
// import BackToTop              from '../backToTop/BackToTop';
import * as userAuthActions   from '../redux/modules/userAuth';
import NewsCard               from '../components/newsCard/NewsCard';
import mockNews               from '../mock/mockNews.json';
// #endregion

// #region flow types
type Props = {
  classes: any,
  ...any
};

type OneNews = {
  id: number | string,
  title: string,
  subtitle?: string,
  sumUp: string,
  ...any
};

type State = {
  news: Array<OneNews>,

  ...any
};
// #endregion

// #region styles
const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
    flexGrow: 1,
  }
};
// #endregion
class Index extends PureComponent<Props, State> {
  state = {
    news: mockNews
  };

  // #region component lifecycle methods
  render() {
    const { news } = this.state;

    return (
      <Layout>
        <Grid
          container
          spacing={24}
        >
          <Grid
            item
            xs={12}
          >
            {
              news.map(
                (oneNews, newsIdx) => (
                  <NewsCard
                    key={`news-${oneNews.id}-${newsIdx}`}
                    {...oneNews}
                  />
                )
              )
            }
          </Grid>
        </Grid>
      </Layout>
    );
  }
  // #endregion

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    Router.push('/login');
  };
}

// #region redux state and dispatch map to props
const mapStateToProps = (
  state: any
) => ({
  // userAuth:
  isAuthenticated: state.userAuth.isAuthenticated,
  isFetching:      state.userAuth.isFetching,
  isLogging:       state.userAuth.isLogging
});

const mapDispatchToProps = (
  dispatch: (...any) => any
) => {
  return {
    ...bindActionCreators(
      {
        // userAuth:
        ...userAuthActions
      },
      dispatch)
  };
};
// #endregion

// #region compose all HOC
const ComposedIndex = compose(
  withRoot,
  withStyles(styles),
  withRedux(
    configureStore,
    mapStateToProps,
    mapDispatchToProps
  )
)(Index);
// #endregion

export default ComposedIndex;
