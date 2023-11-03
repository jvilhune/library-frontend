import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'

import { ALL_BOOKS } from '../queries'
import Book from './Book'
import FilterByGenre from './FilterByGenre'
import { useApolloClient } from '@apollo/client'

const Books = (props) => {

  //const client = useApolloClient()
  //client.resetStore()
  //refetchQueries: [  {query: ALL_BOOKS} ],

  const [allgenres, setAllGenres] = useState()
  const [filterGenre, setFilterGenre] = useState()
  const [loadingResult, result] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: filterGenre },

  })

  useEffect(() => {
    var aaallgenres = Array.prototype.concat.apply([], props.books.map(b => b.genres))
    aaallgenres = [...new Set(aaallgenres)]
    setAllGenres(aaallgenres)
    //console.log('aaallgenres', aaallgenres)
    loadingResult()
  }, [loadingResult])

  if (!props.show) {
    return null
  }

  if (!props.books) {
    return null
  }

  if (!result.called || result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  //console.log('books', books)
  let genres = Array.prototype.concat.apply([], books.map(b => b.genres))
  //console.log('genres', genres)
  genres = [...new Set(genres)]
  //console.log('genres', genres)

  const onClick = (value) => {
    //console.log('value', value)
    setFilterGenre(value)
    loadingResult()
  }

  return (
    <div>
      <h2>books</h2>
      <p>by {filterGenre}</p>
      <table>
        <tbody>
          <tr>
            <th align ="left">title</th>
            <th align ="left">author</th>
            <th align ="left">published</th>
          </tr>
          {
            books.map(book =>
              <Book key={book.title} book={book} />
            )
          }
        </tbody>
      </table>
      <FilterByGenre genres={genres} allgenres={allgenres} onClick={onClick} />
    </div>
  )
}

export default Books

/*



const Books = (props) => {
  if (!props.show) {
    return null
  }

  if (!props.books) {
    return null
  }

  var b = 0

  //const books = []

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {props.books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres[0]} {a.genres[1]} {a.genres[2]} {a.genres[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books


*/