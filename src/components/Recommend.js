
import { useQuery } from '@apollo/client'
import React from 'react'

import { ALL_BOOKS, CURRENT_USER } from '../queries'
import Book from './Book'

const Recommend = ({ token, show }) => {
  const bookResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(CURRENT_USER)

  if (bookResult.loading || meResult.loading) return <div>loading...</div>

  if (!token) {
    return null
  }

  if (!show) {
    return null
  }

  const me = meResult.data.me
  const books = bookResult.data.allBooks.filter(b =>
    b.genres.includes(me.favoriteGenre))

  return (
    <div>
      <h2>recommended books</h2>
      <div>the books in your favorite genre<b> {me.favoriteGenre}</b></div>
      <table>
        <tbody>
          <tr>
            <th align="left">title</th>
            <th align="left">author</th>
            <th align="left">published</th>
          </tr>
          {
            books.map(book =>
              <Book key={book.title} book={book} />
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend