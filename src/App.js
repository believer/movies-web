// @flow

import React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Login from './views/Login/Login'
import LoggedIn from './views/LoggedIn/LoggedIn'

import './App.css'

const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL })
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

const theme = {
  primary: '#E77587',
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/dashboard" render={LoggedIn} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
