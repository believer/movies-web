// @flow

import './LoggedIn.css'
import React from 'react'
import Feed from './Feed/Feed'
import Movie from './Movie/Movie'
import AddMovie from './AddMovie/AddMovie'
import { Switch, Route } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'

const LoggedIn = () => {
  return (
    <div className="Home">
      <Navigation />
      <div>
        <Switch>
          <Route path="/dashboard/feed" component={Feed} />
          <Route path="/dashboard/add-movie" component={AddMovie} />
          <Route path="/dashboard/movie/:id" component={Movie} />
        </Switch>
      </div>
    </div>
  )
}

export default LoggedIn
