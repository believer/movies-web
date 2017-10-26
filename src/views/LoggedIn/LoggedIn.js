// @flow

import React from 'react'
import Feed from './Feed/Feed'
import Movie from './Movie/Movie'
import AddMovie from './AddMovie/AddMovie'
import { Switch, Route } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'
import styled from 'styled-components'

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
        <Route path="/dashboard/feed" component={Feed} />
        <Route path="/dashboard/add-movie" component={AddMovie} />
        <Route path="/dashboard/movie/:id" component={Movie} />
      </Switch>
    </Home>
  )
}

export default LoggedIn
