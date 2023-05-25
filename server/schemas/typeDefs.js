const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    journals: [Journal]!
  }

  type Journal {
    _id: ID
    journalText: String
    journalAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    journals(username: String): [Journal]
    journal(journalId: ID!): Journal
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addJournal(journalText: String!): Journal
    addComment(journalId: ID!, commentText: String!): Journal
    removeJournal(journalId: ID!): Journal
    removeComment(journalId: ID!, commentId: ID!): Journal
  }
`;

module.exports = typeDefs;
