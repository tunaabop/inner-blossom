const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    journals: [Journal]!
    favorites: [Favorites]
  }

  type Favorites {
    _id: ID
    quote: String
    author: String
  }

  type Journal {
    _id: ID
    journalText: String
    journalAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input QuoteInput {
    author: String
    quote: String
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
    removeJournal(journalId: ID!): Journal
    updateJournal(journalId: ID!, journalText: String!): Journal
    addToFavorites(quote: QuoteInput!): User
  }
`;

module.exports = typeDefs;
