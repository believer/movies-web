// @flow

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'
import styled from 'styled-components'
import asyncComponent from '../../environment/asyncComponent'

const AsyncFeed = asyncComponent(() => import('./Feed/Feed'))
const AsyncAddMovie = asyncComponent(() => import('./AddMovie/AddMovie'))
const AsyncMovie = asyncComponent(() => import('./Movie/Movie'))
const AsyncPerson = asyncComponent(() => import('./Person/Person'))
const AsyncProfile = asyncComponent(() => import('./Profile/Profile'))

const Home = styled.div`
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
        <Route path="/dashboard/profile/:id" component={AsyncProfile} />
        <Route path="/dashboard/person/:role/:name" component={AsyncPerson} />
      </Switch>
    </Home>
  )
}

export default LoggedIn
