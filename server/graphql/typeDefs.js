// @flow

// #region types definition
const typeDefs = /* GraphQL */ `
  schema {
    query: Query
  }

  scalar DateTime

  type Query {
    # GET all blogs
    #
    getBlogs(first: Int!, after: String): BlogsPaginated!

    # GET N last blogs
    #
    # (n: number old blogs to retrieve)
    getTopNLastestBlogs(n: Int!): [Blog]!

    # GET N last tweets
    #
    # (n: number old blogs to retrieve)
    getTopNLastestTweets(n: Int!): [Tweet]!

    # GET one author
    #
    # (id: author's id)
    getAuthor(id: ID!): Author!

    # GET all ui page home
    #
    getUIPageHome: [UIPageHome]!
  }

  type BlogsPaginated {
    lastCursor: String!
    nodes: [Blog]!
  }

  type Blog {
    id: ID!
    title: String!
    subtitle: String
    summary: String!
    md_content: String!
    date_publication: DateTime!
    author: String!
  }

  type Author {
    id: ID!
    nickname: String!
    twitter_id: String
    date_creation: DateTime!
  }

  type Tweet {
    id: ID!
    text: String!
    in_reply_to_status_id: ID
    in_reply_to_user_id: ID
    in_reply_to_screen_name: ID
    is_quote_status: Boolean
    retweet_count: Int
    favorite_count: Int
    favorited: Boolean
    retweeted: Boolean
    possibly_sensitive: Boolean
    lang: String
    userId: ID
  }

  type NewsLetter {
    id: ID!
    md_content: String!
    submission_date: DateTime,
    creation_date: DateTime!
  }

  type UIPageHome {
    ui_part_key: String!
    title: String!
    md_content: String!
    edit_date: DateTime!
  }
`;
// #endregion

module.exports = [typeDefs];
