import { gql } from '@apollo/client'

/*
const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int! , $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
*/



//TALLA PITAISI TOIMIA GENREITTAIN
const ALL_BOOKS = gql`
  query allBooks($genre: String){
    allBooks(genre: $genre) {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
`


const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      id
      name
      born
      bookCount
    }
  }
`

/* OMA TALLA TOIMII */
/*
const ALL_BOOKS = gql`
  query {
    aaallBooks {
      id
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`
*/

/*
const ALL_BOOKS = gql`
  query allBooks($genre: String){
    allBooks(genre: $genre) {
      id
      title
      published
      genres
      author {
        title
        author
        published
        genres
      }
    }
  }
`
*/

const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int! , $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export {
  ALL_AUTHORS,
  ALL_BOOKS,
  ADD_BOOK,
  EDIT_AUTHOR,
  LOGIN,
  CURRENT_USER,
  BOOK_ADDED
}