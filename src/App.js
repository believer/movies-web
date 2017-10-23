// @flow

import React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'

import Login from './views/Login/Login'
import LoggedIn from './views/LoggedIn/LoggedIn'

import './App.css'

const httpLink = createHttpLink({ uri: 'http://localhost:3000/graphql' })
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    },
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/dashboard" render={LoggedIn} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
