// @flow


// #region imports
import React, {
  PureComponent
}                             from 'react';
import {
  compose,
  bindActionCreators
}                             from 'redux';
import withRedux              from 'next-redux-wrapper';
import Grid                   from 'material-ui/Grid';
import { withStyles }         from 'material-ui/styles';
import withRoot               from '../HOC/withRoot';
import Layout                 from '../components/layout/Layout';
import configureStore         from '../redux/store/configureStore';
import NewsCard               from '../components/newsCard/NewsCard';
import mockNews               from '../mock/mockNews.json';
import { Tweet }              from 'react-twitter-widgets';
// #endregion

// #region flow types
type InitialProps = {
  req: any,
  res: any,
  pathname: string,
  query: any,
  asPath: string,
  isServer: boolean,
  store?: any,
  ...any
};

type Props = {
  // withStyle HOC
  classes: any,
  // initialProps
  pathname: string,
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


class Blog extends PureComponent<Props, State> {
  // #region next initialProps
  static getInitialProps(
    { pathname }: InitialProps
  ) {
    return { pathname };
  }
  // #endregion

  // #region state initialization
  state = {
    news: mockNews
  };
  // #endregion

  // #region component lifecycle methods
  render() {
    const { 
      news 
    } = this.state;

    const {
      pathname
    } = this.props;

    return (
      <Layout
        pathname={pathname}
      >
        <Grid
          container
          spacing={24}
        >
          <Grid
            // key={`news-${.id}-${newsIdx}`}
            item
            sm={8}
            xs={8}
          >
            <div style={{height: '10px'}} />
            {
              news.map(
                (oneNews, newsIdx) => (
                  <div
                    key={`news-${oneNews.id}-${newsIdx}`}
                    style={{marginBottom: '20px'}}
                  >
                    <NewsCard
                      key={`news-${oneNews.id}-${newsIdx}`}
                      {...oneNews}
                    />
                  </div>
                )
              )
            }
          </Grid>
          <Grid
            item
            sm={4}
            xs={4}
          >
            {
              [1, 2, 3, 4, 5,  6, 7].map(
                (_, newsIdx) => (

                  <div
                    key={`tweet-${newsIdx}`}
                  >
                    <Tweet
                      tweetId="939235471942615040"
                    /> 
                  </div>
                )
              )
            }
          </Grid>
        </Grid>
      </Layout>
    );
  }
  // #endregion
}


// #region redux state and dispatch map to props
const mapStateToProps = (
  state: any
) => ({
  // to define
});

const mapDispatchToProps = (
  dispatch: (...any) => any
) => {
  return {
    ...bindActionCreators(
      {
        // to define
      },
      dispatch)
  };
};
// #endregion

// #region compose all HOC
const ComposedAbout = compose(
  withRoot,
  withStyles(styles),
  withRedux(
    configureStore,
    mapStateToProps,
    mapDispatchToProps
  )
)(Blog);
// #endregion

export default ComposedAbout;
