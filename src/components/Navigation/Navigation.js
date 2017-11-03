// @flow

import React from 'react'
import InlineList from './InlineList'
import Header from './Header'
import Logo from './Logo'
import NavigationItem from './NavigationItem'
import NavigationLink from './NavigationLink'

const Navigation = () => {
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
        <NavigationItem>
          <NavigationLink to="/dashboard/profile/:id">Profile</NavigationLink>
        </NavigationItem>
      </InlineList>
    </Header>
  )
}

export default Navigation
