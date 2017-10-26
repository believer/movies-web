// @flow

import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { client } from '../environment/ApolloSetup'
import asyncComponent from '../environment/asyncComponent'
import { theme } from '../styles/theme'
import LoggedIn from './LoggedIn/LoggedIn'

const AsyncLogin = asyncComponent(() => import('./Login/Login'))

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/dashboard" render={LoggedIn} />
            <Route path="/login" component={AsyncLogin} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
