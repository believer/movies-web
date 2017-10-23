// @flow

import './Navigation.css'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="Navigation">
      <div className="Navigation__logo">Movies</div>
      <ul className="Navigation__list">
        <li className="Navigation__item">
          <NavLink
            activeClassName="Navigation__link--active"
            className="Navigation__link"
            to="/feed"
          >
            Feed
          </NavLink>
        </li>
        <li className="Navigation__item">
          <NavLink
            activeClassName="Navigation__link--active"
            className="Navigation__link"
            to="/add-movie"
          >
            Add movie
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
