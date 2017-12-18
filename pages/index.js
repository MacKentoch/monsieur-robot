// @flow

// #region imports
import React, {
  PureComponent, SyntheticEvent
}                             from 'react';
import {
  compose,
  bindActionCreators
}                             from 'redux';
import withRedux              from 'next-redux-wrapper';
import Router                 from 'next/router';
import Grid                   from 'material-ui/Grid';
import { withStyles }         from 'material-ui/styles';
import Paper                  from 'material-ui/Paper';
import Button                 from 'material-ui/Button';
import Typography             from 'material-ui/Typography';
import withRoot               from '../HOC/withRoot';
import Layout                 from '../components/layout/Layout';
import NewsCard               from '../components/newsCard/NewsCard';
import mockNews               from '../mock/mockNews.json';
import configureStore         from '../redux/store/configureStore';
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
  },
  ourProjectContainer: {
    marginTop: '70px'
  }
};
// #endregion
class Index extends PureComponent<Props, State> {
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
          {/* left content */}
          <Grid
            item
            sm={8}
            xs={8}
          >
            <Grid
              container
              spacing={24}
            >
              {/* what is the fides project */}
              <Grid
                item
                xs={6}
              >
                <Typography 
                  type="title" 
                  gutterBottom
                >
                What is the Fides Project
                </Typography>
                <Typography 
                  type="body1" 
                  gutterBottom 
                  align="left"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Button 
                  // raised
                  onClick={this.routeTo('/about')}
                >
                  learn more about the fides project
                </Button>
              </Grid>
              {/* why does provacy matters */}
              <Grid
                item
                xs={6}
              >
                <Typography 
                  type="title" 
                  gutterBottom
                >
                Why does privacy matters
                </Typography>
                <Typography 
                  type="body1" 
                  gutterBottom 
                  align="left"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Button 
                  // raised 
                  onClick={this.routeTo('/getInvolved')}
                >
                  get involved with the fides project
                </Button>
              </Grid>
            </Grid>
            {/* our projects */}
            <div
              className={styles.ourProjectContainer}
            >
              <Grid
                container
                spacing={24}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Typography 
                    type="title" 
                    gutterBottom
                  >
                  Our projects
                  </Typography> 
                  <div>
                    <Typography
                      type="body1" 
                      gutterBottom
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam facilisis nisl sed justo egestas, at fringilla sem accumsan. Etiam bibendum viverra tristique. Fusce id vehicula sapien. Nullam porta, justo a interdum tincidunt, est nisl hendrerit metus, vitae pharetra lorem tellus eu elit. Vivamus imperdiet rutrum nibh, sit amet semper nisl maximus eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed lobortis purus nec condimentum consequat. Phasellus in nibh sed odio pellentesque blandit accumsan ac nisl. Donec at nulla elementum, tempus turpis ut, congue nisl.

                      Etiam aliquam, arcu at posuere malesuada, sem est lacinia eros, vitae blandit justo elit non arcu. Ut nec pretium risus. Aliquam fermentum pulvinar maximus. Fusce ipsum leo, ornare in leo vel, dapibus sollicitudin massa. Ut consectetur justo id pretium consequat. Suspendisse ipsum augue, faucibus lobortis felis vel, vestibulum malesuada neque. Phasellus justo mi, efficitur id libero eu, hendrerit tempus nulla. Morbi lacus turpis, feugiat vel tellus eu, dapibus vehicula ex. Ut nec dui lectus. Nunc in dignissim neque.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid
            item
            sm={4}
            xs={4}
          >
            {/* Recent blog */}
            <Grid
              container
              spacing={24}
            >
              <Grid
                item
                xs={12}
              >
                <Typography 
                  type="title" 
                  gutterBottom
                >
                Recent blog
                </Typography> 
                {
                  news.slice(0, 3).map(
                    (oneNews, newsIdx) => (
                      <div
                        key={`news-${oneNews.id}-${newsIdx}`}
                        style={{marginBottom: '20px'}}
                      >
                        <NewsCard
                          key={`news-${oneNews.id}-${newsIdx}`}
                          showSumUp={false}
                          {...oneNews}
                        />
                      </div>
                    )
                  )
                }
              </Grid>
            </Grid>

            {/* Recent tweets */}
            <Grid
              container
              spacing={24}
            >
              <Grid
                item
                xs={12}
              >
                <Typography 
                  type="title" 
                  gutterBottom
                >
                Recent tweets
                </Typography> 
                {
                  [1, 2, 3].map(
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
          </Grid>
        </Grid>
      </Layout>
    );
  }
  // #endregion

  // #region click events to route to specific pathname
  routeTo = (
    pathname: string
  ) => (
    event: SyntheticEvent<>
  ): void => {
    if (event) {
      event.preventDefault();
    }
    Router.push({ pathname });
  }

  // #endregion
}

// #region redux state and dispatch map to props
const mapStateToProps = (
  state: any
) => ({
  // to add
});

const mapDispatchToProps = (
  dispatch: (...any) => any
) => {
  return {
    ...bindActionCreators(
      {
        // to add
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
