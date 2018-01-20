// @flow

// #region imports
import React, { PureComponent } from 'react';
import { compose, bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { Tweet } from 'react-twitter-widgets';
import { CircularProgress } from 'material-ui/Progress';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withRoot from '../HOC/withRoot';
import Layout from '../components/layout/Layout';
import configureStore from '../redux/store/configureStore';
import NewsCard from '../components/newsCard/NewsCard';
import NavMenus from '../components/navigationMenu/NavigationMenu';
import withApollo from '../HOC/withApollo';
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
  ...any,
};

type BlogType = {
  id: number,
  title: string,
  subtitle?: string,
  summary?: string,
  md_content: string,
  date_publication: date,
  author: string,
};

type Props = {
  // withStyle HOC
  classes: any,

  // GetBlogs query
  blogs: Array<BlogType>,
  isLoadingBlogs: boolean,

  // initialProps
  pathname: string,

  ...any,
};

type State = {
  ...any,
};
// #endregion

// #region styles
const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
    flexGrow: 1,
  },
  tweetContainer: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
// #endregion

class Blog extends PureComponent<Props, State> {
  // #region next initialProps
  static getInitialProps({ pathname }: InitialProps) {
    return { pathname };
  }
  // #endregion

  static defaultProps = {
    pathname: '/blog',
    blogs: [],
    isLoadingBlogs: false,
  };

  // #region state initialization
  state = {};
  // #endregion

  // #region component lifecycle methods
  render() {
    const { classes, blogs, isLoadingBlogs } = this.props;

    return (
      <Layout pathname={'/blog'} navigationMenus={<NavMenus />}>
        <Grid container spacing={24}>
          <Grid item md={8} sm={12} xs={12}>
            <div style={{ height: '10px' }} />
            {isLoadingBlogs && (
              <span className={classes.progressContainer}>
                <CircularProgress className={classes.progress} />
              </span>
            )}
            {!isLoadingBlogs &&
              blogs.map((blog, newsIdx) => (
                <div
                  key={`news-${blog.id}-${newsIdx}`}
                  style={{ marginBottom: '20px' }}
                >
                  <NewsCard
                    key={`news-${blog.id}-${newsIdx}`}
                    showSumUp={false}
                    {...blog}
                  />
                </div>
              ))}
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            {[1, 2, 3, 4, 5, 6, 7].map((_, newsIdx) => (
              <div key={`tweet-${newsIdx}`} className={classes.tweetContainer}>
                <Tweet
                  tweetId="939235471942615040"
                  options={{
                    width: '90%',
                  }}
                />
              </div>
            ))}
          </Grid>
        </Grid>
      </Layout>
    );
  }
  // #endregion
}

// #region redux state and dispatch map to props
const mapStateToProps = (state: any) => ({
  // to define
});

const mapDispatchToProps = (dispatch: (...any) => any) => {
  return {
    ...bindActionCreators(
      {
        // to define
      },
      dispatch,
    ),
  };
};
// #endregion

// #region graphql queries
const GetBlogsQuery = gql`
  query GetBlogs {
    getBlogs {
      id
      title
      subtitle
      md_content
      date_publication
      author
    }
  }
`;

const GetBlogsQueryOptions = {
  /* eslint-disable no-unused-vars */
  options: () => ({ errorPolicy: 'ignore' }),
  props: ({ ownProps, data: { loading, getBlogs /* , refetch*/ } }) => {
    // no need to return data (avoid no use re-renders)
    if (!loading) {
      return { isLoadingBlogs: loading, blogs: getBlogs };
    }
    return { isLoadingBlogs: loading };
  },
  /* eslint-enable no-unused-vars */
};
// #endregion

// #region compose all HOC
const ComposedAbout = compose(
  withRedux(configureStore, mapStateToProps, mapDispatchToProps),
  withApollo(),
  graphql(GetBlogsQuery, GetBlogsQueryOptions),
  withRoot,
  withStyles(styles),
)(Blog);
// #endregion

export default ComposedAbout;
