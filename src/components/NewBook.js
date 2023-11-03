import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = ({ notifyCall, show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS },  { query: ALL_AUTHORS } ],
    onError: (error) => {
      notifyCall(error.message, 'error')
      //const messages = error.graphQLErrors.map(e => e.message).join('\n')
      //setError(messages)
    }
  })

  if (!show) {
    return null
  }

  const addbooktoken = localStorage.getItem('book-user-token')
  //console.log('addbooktoken', addbooktoken)

  const submit = async (event) => {
    event.preventDefault()


    //console.log('add book...')

    //addBook({  variables: { title, author, published, genre } })

    addBook({
      variables: {
        title: title,
        author: author,
        published: Number(published),
        genres
      }
    })

    /*
    console.log('title', title)
    console.log('author', author)
    console.log('published', published)
    console.log('genres', genres)
    */

    notifyCall(`A new book ${title} written by ${author}`)

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add book</h2>
      <form onSubmit={submit}>
        <div>
          title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published&nbsp;
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook