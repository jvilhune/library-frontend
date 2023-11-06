//npm install react-select
//apollo-link-ws
//npm install @apollo/client graphql
//npm install graphql-ws
//npm install @apollo/link-ws
//npm install --save subscriptions-transport-ws

import { useQuery, useApolloClient } from '@apollo/client'
import { useSubscription } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Booksall from './components/Booksall'
import Recommend from './components/Recommend'
import NewBook from './components/NewBook'
import BornForm from './components/BornForm'
import Notification from "./components/Notification"
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (dataInStore && !includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      notifyCall(`subscription : ${book.title} added`)
      updateCacheWith(book)
    }
  })

  const authorresult = useQuery(ALL_AUTHORS, {
    //pollInterval: 5000
  })
  const bookresult = useQuery(ALL_BOOKS, {
    //pollInterval: 10000
  })

  const Refresh = () => {
    const result = useQuery(ALL_BOOKS)
    setPage('books')
  }

  if (authorresult.loading)  {
    return <div>loading...</div>
  }

  if (bookresult.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const notifyCall = (message, type = "success", timer = 5000) => {
    setNotification({ message, type })
    setTimeout(() => { setNotification(null) }, timer)
  }

  const logout = () => {
    //console.log('FROM LOGOUT FUNCTION token', token)
    setToken(null)
    localStorage.clear()
    client.resetStore()

    notifyCall(`succeeded log out`, 'success', 5000)
  }

  if (!token) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm setToken={setToken} notifyCall={notifyCall} />
      </>
    )
  }


  return (
    <div>
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('booksall')}>all books</button>
      <button onClick={() => setPage('recommend')}>recommend</button>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('bornnum')}>set birthyear</button>
      <Logout token={token} logout={logout} />


    </div>
    <p></p>
    <Notification notification={notification} />
    <Authors authors={authorresult.data.allAuthors} show={page === 'authors'} />
    <Books books={bookresult.data.allBooks} show={page === 'books'} />
    <Booksall books={bookresult.data.allBooks} show={page === 'booksall'} />
    <Recommend token={token} show={page === 'recommend'} />
    <NewBook show={page === 'add'} notifyCall={notifyCall} />
    <BornForm show={page === 'bornnum'} notifyCall={notifyCall} authors={authorresult.data.allAuthors} />
    </div>
  )
}


export default App
