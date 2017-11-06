// @flow

import React from 'react'
import InlineList from './InlineList'
import Header from './Header'
import Logo from './Logo'
import Profile from './Profile'
import NavigationItem from './NavigationItem'
import NavigationLink from './NavigationLink'
import { deconstructJWT } from '../../utils/token'
import Gravatar from '../../components/Gravatar/Gravatar'

const Navigation = () => {
  const token = localStorage.getItem('token')
  const { data: { user: { id, email } } } = deconstructJWT(token)

  return (
    <Header>
      <Logo>Movies</Logo>
      <InlineList>
        <NavigationItem>
          <NavigationLink to="/dashboard/feed">Feed</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/dashboard/add-movie">Add movie</NavigationLink>
        </NavigationItem>
      </InlineList>
      <Profile>
        <NavigationLink to={`/dashboard/profile/${id}`}>
          <Gravatar email={email} size={40} />
        </NavigationLink>
      </Profile>
    </Header>
  )
}

export default Navigation
