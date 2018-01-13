// @flow

// #region imports
import React, { PureComponent, SyntheticEvent } from 'react';
import { compose, bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { Tweet } from 'react-twitter-widgets';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withRoot from '../HOC/withRoot';
import Layout from '../components/layout/Layout';
import NewsCard from '../components/newsCard/NewsCard';
import NavMenus from '../components/navigationMenu/NavigationMenu';
import configureStore from '../redux/store/configureStore';
import withApollo from '../HOC/withApollo';
import Markdown from '../components/markdown/Markdown';
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

type UIType = {
  ui_part_key: string,
  title: string,
  md_content: string,
  edit_date: Date,
};

type LatestBlogs = {
  title: string,
  subtitle: string,
  summary: string,
  date_publication: date,
  author: string,
};

type Props = {
  // withStyle HOC
  classes: any,

  // initialProps
  pathname: string,

  // graphql
  isLoadingUI: boolean,
  ui: Array<UIType>,

  isLoadingBlogs: boolean,
  topBlogs: Array<LatestBlogs>,

  ...any,
};

// type OneNews = {
//   id: number | string,
//   title: string,
//   subtitle?: string,
//   sumUp: string,
//   ...any,
// };

type State = {
  ...any,
};
// #endregion

// #region styles
const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: 200,
    flexGrow: 1,
  },
  ourProjectContainer: {
    // marginTop: '150px',
  },
  progressContainer: {
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 10}px`,
  },
});
// #endregion
class Index extends PureComponent<Props, State> {
  // #region next initialProps
  static getInitialProps({ pathname }: InitialProps) {
    return { pathname };
  }
  // #endregion

  static defaultProps = {
    isLoadingUI: false,
    ui: [],
    isLoadingBlogs: false,
    topBlogs: [],
  };

  // #region component lifecycle methods
  render() {
    const {
      classes,
      pathname,
      isLoadingUI,
      ui,
      isLoadingBlogs,
      topBlogs,
    } = this.props;

    console.log('topBlogs: ', topBlogs);

    const mdParagraphTopLeft = ui
      ? ui.find(md => md.ui_part_key === 'paragraphTopLeft')
      : '';
    const mdParagraphTopRight = ui
      ? ui.find(md => md.ui_part_key === 'paragraphTopRight')
      : '';
    const mdParagraphBottomCenter = ui
      ? ui.find(md => md.ui_part_key === 'paragraphBottomCenter')
      : '';

    return (
      <Layout pathname={pathname} navigationMenus={<NavMenus />}>
        <Grid container spacing={24}>
          {/* left content */}
          <Grid item md={8} sm={12} xs={12}>
            <Grid container spacing={24}>
              {/* what is the fides project */}
              <Grid item md={6} sm={6} xs={12}>
                <Typography type="title" gutterBottom>
                  What is the Fides Project
                </Typography>
                <Typography type="body1" gutterBottom align="left">
                  <span>
                    {!isLoadingUI &&
                      mdParagraphTopLeft && (
                        <Markdown text={mdParagraphTopLeft.md_content} />
                      )}
                    {isLoadingUI ||
                      (!mdParagraphTopLeft && (
                        <span className={classes.progressContainer}>
                          <CircularProgress className={classes.progress} />
                        </span>
                      ))}
                  </span>
                </Typography>
                <Button
                  onClick={
                    this.routeTo('/about') // raised
                  }
                >
                  learn more about the fides project
                </Button>
              </Grid>
              {/* why does provacy matters */}
              <Grid item md={6} sm={6} xs={12}>
                <Typography type="title" gutterBottom>
                  Why does privacy matters
                </Typography>
                <Typography type="body1" gutterBottom align="left">
                  <span>
                    {!isLoadingUI &&
                      mdParagraphTopRight && (
                        <Markdown text={mdParagraphTopRight.md_content} />
                      )}
                    {isLoadingUI ||
                      (!mdParagraphTopRight && (
                        <span className={classes.progressContainer}>
                          <CircularProgress className={classes.progress} />
                        </span>
                      ))}
                  </span>
                </Typography>
                <Button
                  onClick={
                    this.routeTo('/getInvolved') // raised
                  }
                >
                  get involved with the fides project
                </Button>
              </Grid>
            </Grid>
            {/* our projects */}
            <div className={styles.ourProjectContainer}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography type="title" gutterBottom>
                    Our projects
                  </Typography>
                  <div>
                    <Typography type="body1" gutterBottom>
                      <span>
                        {!isLoadingUI &&
                          mdParagraphBottomCenter && (
                            <Markdown
                              text={mdParagraphBottomCenter.md_content}
                            />
                          )}
                        {isLoadingUI ||
                          (!mdParagraphBottomCenter && (
                            <span className={classes.progressContainer}>
                              <CircularProgress className={classes.progress} />
                            </span>
                          ))}
                      </span>
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          {/* right content */}
          <Grid item md={4} sm={12} xs={12}>
            {/* Recent blog */}
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography type="title" gutterBottom>
                  Recent blog
                </Typography>
                {isLoadingBlogs && (
                  <span className={classes.progressContainer}>
                    <CircularProgress className={classes.progress} />
                  </span>
                )}
                {!isLoadingBlogs &&
                  topBlogs.map((blog, newsIdx) => (
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
            </Grid>

            {/* Recent tweets */}
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography type="title" gutterBottom>
                  Recent tweets
                </Typography>
                {[1, 2, 3].map((_, newsIdx) => (
                  <div key={`tweet-${newsIdx}`}>
                    <Tweet tweetId="939235471942615040" />
                  </div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
  // #endregion

  // #region click events to route to specific pathname
  routeTo = (pathname: string) => (event: SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }
    Router.push({ pathname });
  };
  // #endregion
}

// #region redux state and dispatch map to props
/* eslint-disable no-unused-vars */
const mapStateToProps = state => ({
  // to add
});

const mapDispatchToProps = (dispatch: (...any) => any) => {
  return {
    ...bindActionCreators(
      {
        // to add
      },
      dispatch,
    ),
  };
};
/* eslint-enable no-unused-vars */
// #endregion

// #region graphql query getPageHome
const GetUIPageHomeQuery = gql`
  query getPageHome {
    getUIPageHome {
      ui_part_key
      title
      md_content
      edit_date
    }
  }
`;

const GetUIPageHomeOptions = {
  /* eslint-disable no-unused-vars */
  props: ({
    ownProps,
    data: { loading, getUIPageHome /* , refetch, error*/ },
  }) => {
    if (!loading) {
      return { isLoadingUI: loading, ui: getUIPageHome };
    }
    return { isLoadingUI: loading };
  },
  /* eslint-enable no-unused-vars */
};
// #endregion

// #region graphql query getTopNLastestBlogs
const GetTopNLastestBlogs = gql`
  query getTopNLastestBlogs($n: Int!) {
    getTopNLastestBlogs(n: $n) {
      title
      subtitle
      summary
      date_publication
      author
    }
  }
`;

const GetTopNLastestBlogsOptions = {
  /* eslint-disable no-unused-vars */
  options: () => ({ variables: { n: 3 } }),
  props: ({
    ownProps,
    data: { loading, getTopNLastestBlogs /* , refetch, error*/ },
  }) => {
    if (!loading) {
      return { isLoadingBlogs: loading, topBlogs: getTopNLastestBlogs };
    }
    return { isLoadingBlogs: loading };
  },
  /* eslint-enable no-unused-vars */
};
// #endregion

// #region compose all HOC
const ComposedIndex = compose(
  withRedux(configureStore, mapStateToProps, mapDispatchToProps),
  withApollo(),
  graphql(GetUIPageHomeQuery, GetUIPageHomeOptions),
  graphql(GetTopNLastestBlogs, GetTopNLastestBlogsOptions),
  withRoot,
  withStyles(styles),
)(Index);
// #endregion

export default ComposedIndex;
