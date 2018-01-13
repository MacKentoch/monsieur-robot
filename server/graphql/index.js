// @flow

// #region imports
const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const DateTimeSchema = require('./datetime/schema');
const dateTimeResolvers = require('./datetime/resolvers');

const BlogSchema = require('./blog/schema');
const blogResolvers = require('./datetime/resolvers');

const AuthorSchema = require('./author/schema');
const authorResolvers = require('./author/resolvers');

const NewsletterSchema = require('./newsletter/schema');
const newsletterResolvers = require('./newsletter/resolvers');

const uiPageHomeSchema = require('./uiPageHome/schema');
const uiPageHomeResolvers = require('./uiPageHome/resolvers');
// #endregion

const SchemaDefinition = /* GraphQL */ `
  schema {
    query: Query
  }
`;

const Query = /* GraphQL */ `
  type Query {
    # ### GET one author
    #
    # _Arguments_
    # - **id**: author's id (mandatory)
    getAuthor(id: ID!): Author!
    # ### GET all blogs
    #
    #
    #
    getBlogs: [Blog]!
    # ### GET N last blogs
    #
    # _Arguments_
    # - **n**: number og blogs to retrieve (mandatory)
    getTopNLastestBlogs(n: Int!): [Blog]!
    # ### GET all newsletters
    #
    #
    #
    getNewsletters: [NewsLetter]!
    # ### GET all ui page home
    #
    #
    #
    getUIPageHome: [UIPageHome]!
  }
`;

const rootResolvers = {
  ...dateTimeResolvers,
  ...authorResolvers,
  ...blogResolvers,
  ...newsletterResolvers,
  ...uiPageHomeResolvers,
};

const schema = makeExecutableSchema({
  typeDefs: [
    ...DateTimeSchema,
    ...AuthorSchema,
    ...BlogSchema,
    ...NewsletterSchema,
    ...uiPageHomeSchema,
    Query,
    SchemaDefinition,
  ],
  resolvers: merge({}, rootResolvers),
});

module.exports = schema;
