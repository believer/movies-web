// @flow

import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Login from './views/Login/Login'
import LoggedIn from './views/LoggedIn/LoggedIn'
import { client } from './ApolloSetup'

const theme = {
  primary: '#F16685',
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
