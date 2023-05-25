import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_JOURNAL = gql`
  mutation addJournal($journalText: String!) {
    addJournal(journalText: $journalText) {
      _id
      journalText
      journalAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($journalId: ID!, $commentText: String!) {
    addComment(journalId: $journalId, commentText: $commentText) {
      _id
      journalText
      journalAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
