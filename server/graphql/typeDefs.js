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
    getBlogs: [Blog]!

    # GET N last blogs
    #
    # (n: number old blogs to retrieve)
    getTopNLastestBlogs(n: Int!): [Blog]!

    # GET one author
    #
    # (id: author's id)
    getAuthor(id: ID!): Author!

    # GET all ui page home
    #
    getUIPageHome: [UIPageHome]!
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
