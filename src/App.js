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
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  spacing: {
    '5': '5px',
    '10': '10px',
    '20': '20px',
    '30': '30px',
    '60': '60px',
    auto: 'auto',
  },
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
