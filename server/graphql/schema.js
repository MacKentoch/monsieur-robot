// @flow

// #region imports
const { makeExecutableSchema } = require('graphql-tools');
const { GraphQLDateTime } = require('graphql-iso-date');
const { GraphqlError } = require('../lib/Graphql');
// #endregion

const typeDefs = /* GraphQL */ `
  schema {
    query: Query
    mutation: Mutation
  }

  scalar DateTime

  type Query {
    getBlogs(): [Blog]!
  }

  type Mutation {
  }

  type Blog {
    id: ID!
    title: String!,
    subTitle: String,
    date_publication: Datetime!
  }
`;

const resolvers = {
  DateTime: GraphQLDateTime,

  Query: {
    async getBlogs(obj, args, { loaders }) {
      try {
        const blogs = await loaders.blog.load();
        return blogs;
      } catch (error) {
        const code = error.code ? error.code : '-1';
        const message = error.message ? error.message : '-1';
        throw new GraphqlError(code, message);
      }
    },
  },

  Mutation: {},
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
