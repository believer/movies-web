// @flow

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'
import styled from 'styled-components'
import asyncComponent from '../../environment/asyncComponent'

const AsyncFeed = asyncComponent(() => import('./Feed/Feed'))
const AsyncAddMovie = asyncComponent(() => import('./AddMovie/AddMovie'))
const AsyncMovie = asyncComponent(() => import('./Movie/Movie'))

const Home = styled.div`
  background-color: #fff;
  border-radius: 6px;
  display: grid;
  grid-template-rows: 60px 1fr;
  height: 100vh;
  position: relative;
  z-index: 1;
`

const LoggedIn = () => {
  return (
    <Home>
      <Navigation />
      <Switch>
        <Route path="/dashboard/feed" component={AsyncFeed} />
        <Route path="/dashboard/add-movie" component={AsyncAddMovie} />
        <Route path="/dashboard/movie/:id" component={AsyncMovie} />
      </Switch>
    </Home>
  )
}

export default LoggedIn
