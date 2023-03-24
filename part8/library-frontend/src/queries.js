import { gql } from "@apollo/client";

export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
      title
      published
      author {
        name
        id
        born
      }
      id
      genres
    }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
     ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const UPDATE_YEAR = gql`
  mutation updateYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooksGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const MY_DETAILS = gql`
  query {
    me {
      id
      username
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
      subscription {
        bookAdded {
          ...BookDetails
        }
      }
      ${BOOK_DETAILS}
`
