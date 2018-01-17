// @flow
/* eslint-disable camelcase */

// #region imports
const { GraphqlError } = require('../lib/graphqlErrors');
const db = require('../db');
const { GraphQLDateTime } = require('graphql-iso-date');
const twitterClient = require('../lib/twitterClient');
const config = require('../config');
// #endregion

const resolvers = {
  DateTime: GraphQLDateTime,

  Query: {
    async getBlogs() {
      try {
        const { rows: blogs } = await db.query(
          `SELECT blogs.*, authors.nickname author
          FROM blogs INNER JOIN authors ON blogs.author = authors.id
          ORDER BY blogs.date_publication DESC`,
        );
        return blogs;
      } catch (error) {
        const code = error.code ? error.code : '-1';
        const message = error.message ? error.message : '-1';
        throw new GraphqlError(code, message);
      }
    },

    async getTopNLastestBlogs(obj, { n }) {
      try {
        const { rows: blogs } = await db.query(
          `SELECT blogs.*, authors.nickname author
          FROM blogs INNER JOIN authors ON blogs.author = authors.id
          ORDER BY blogs.date_publication DESC
          LIMIT $1`,
          [n],
        );
        return blogs;
      } catch (error) {
        const code = error.code ? error.code : '-1';
        const message = error.message ? error.message : '-1';
        throw new GraphqlError(code, message);
      }
    },

    async getTopNLastestTweets(obj, { n }) {
      try {
        const user_id = config.get('tweetsUserId');
        const tweets = await twitterClient.get(
          `statuses/user_timeline.json?count=${n}&user_id=${user_id}&exclude_replies=true`,
        );
        console.log('tweets: ', tweets);
        if (Array.isArray(tweets)) {
          return tweets.map(tweet => {
            const {
              id,
              text,
              in_reply_to_status_id,
              in_reply_to_user_id,
              in_reply_to_screen_name,
              is_quote_status,
              retweet_count,
              favorite_count,
              favorited,
              retweeted,
              possibly_sensitive,
              lang,
              retweeted_status, // : { user: { id: userId } },
            } = tweet;

            return {
              id,
              text,
              in_reply_to_status_id,
              in_reply_to_user_id,
              in_reply_to_screen_name,
              is_quote_status,
              retweet_count,
              favorite_count,
              favorited,
              retweeted,
              possibly_sensitive,
              lang,
              userId: retweeted_status ? retweeted_status.user.id : 0,
            };
          });
        }
        return [];
      } catch (error) {
        const code = error.code ? error.code : '-1';
        const message = error.message ? error.message : '-1';
        throw new GraphqlError(code, message);
      }
    },

    async getAuthor(obj, { id }, { loaders }) {
      try {
        const author = await loaders.author.load(id);
        return author;
      } catch (error) {
        const code = error.code ? error.code : '-1';
        const message = error.message ? error.message : '-1';
        throw new GraphqlError(code, message);
      }
    },

    async getUIPageHome() {
      try {
        const { rows } = await db.query(
          `SELECT ui_part_key, title, md_content, edit_date
          FROM page_home;`,
        );
        if (!Array.isArray(rows)) {
          const code = '-1';
          const message = 'uiPageHome query failed';
          throw new GraphqlError(code, message);
        }
        return rows;
      } catch (error) {
        const code = error.code ? error.code : '-1';
        const message = error.message ? error.message : '-1';
        throw new GraphqlError(code, message);
      }
    },
  },
};

module.exports = resolvers;
