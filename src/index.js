import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createHttpLink, HttpLink, ApolloClient, InMemoryCache, ApolloProvider, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { WebSocketLink } from '@apollo/link-ws'
import { createClient } from 'graphql-ws'

import './index.css'

  const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

  /*
  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000',
    options: { reconnect: true }
  })
  */

    const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000',
  }))

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('book-user-token')
    //console.log('AUTHLINK EXECUTED')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      }
    }
  })

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
  )

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
  })

  ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )