// @flow

// #region imports
import { withData } from 'next-apollo';
// import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import appConfig from '../config/appConfig';
// import { setContext } from 'apollo-link-context';
// #endregion

// #region constants
let baseUrl = appConfig.baseUrl;
/* eslint-disable no-process-env */
if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.SERVER_EXT_URL || appConfig.baseUrl;
}

if (window) {
  window.SERVER_EXT_URL = baseUrl;
}

/* eslint-enable no-process-env */
// #endregion

// #region link, middleware
const httplink = createHttpLink({
  uri: `${baseUrl}/graphql`,
  credentials: 'same-origin',
});

// #region git user token from localStorage (or token local cache if available)
// let token;
// async function getUserToken() {
//   if (token) {
//     return token;
//   }

//   token =
//     localStorage && localStorage.getItem('token')
//       ? localStorage.getItem('token')
//       : null;
//   return token;
// }
// // #endregion

// const middlewareLink = setContext(async () => {
//   const currentUsertoken = await getUserToken();
//   return { headers: { authorization: currentUsertoken || null } };
// });

const link = httplink; // .concat(middlewareLink);
// #endregion

// #region cache
const cache = new InMemoryCache();
// #endregion

// #region environment flag
/* eslint-disable no-process-env */
const isDevEnv = process.env.NODE_ENV === 'development';
/* eslint-enable no-process-env */
// #endregion

// #region apollo client instanciation
// const client = new ApolloClient({
//   link,
//   cache, // : cache.restore(window.__APOLLO_STATE__),
//   connectToDevTools: isDevEnv,
//   queryDeduplication: true,
// });
// #endregion
// export default client;

// #region we don't use traditional ApolloClient in a NextJS app
const apolloConfig = {
  link,
  cache, // : cache.restore(window.__APOLLO_STATE__),
  connectToDevTools: isDevEnv,
  queryDeduplication: true,
};
export default withData(apolloConfig);
