import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      journals {
        _id
        journalText
        createdAt
      }
      favorites {
        _id
        quote
        author
      }
    }
  }
`;

export const QUERY_JOURNALS = gql`
  query getJournals {
    journals {
      _id
      journalText
      journalAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_JOURNAL = gql`
  query getSingleJournal($journalId: ID!) {
    journal(journalId: $journalId) {
      _id
      journalText
      journalAuthor
      createdAt
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  { 
    me {
      _id
      username
      email
      journals {
        _id
        journalText
        journalAuthor
        createdAt
      }
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      journals {
        _id
        journalText
        journalAuthor
        createdAt
      }
      favorites {
        _id
        quote
        author
      }
    }
  }
`;

export const DELETE_JOURNAL = gql`
  mutation deleteJournal($id: ID!) {
    deleteJournal(id: $id)
  }
`;

export const GET_JOURNALS = gql`
  query getJournals {
    journals {
      _id
      journalText
      createdAt
      journalAuthor
    }
  }
`;