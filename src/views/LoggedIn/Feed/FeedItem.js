// @flow

import React, { Component } from 'react'
import gql from 'graphql-tag'
import Gravatar from '../../../components/Gravatar/Gravatar'
import moment from 'moment'
import type { FeedMovie } from './Feed'
import type { RouterHistory } from 'react-router-dom'

type Props = {
  movie: FeedMovie,
  history: RouterHistory
}

class FeedItem extends Component<Props> {
  static fragments = {
    movie: gql`
      fragment FeedItemMovie on Movie {
        genres
        id
        title
        rating
        user {
          email
          id
        }
        views
        year
      }
    `,
  }

  handleClick = () => {
    const { history, movie } = this.props
    history.push(`/dashboard/movie/${movie.id}`)
  }

  render () {
    const { movie } = this.props

    return (
      <li className="Feed__movie" onClick={this.handleClick}>
        <Gravatar email={movie.user.email} size={40} />
        <div className="Feed__content">
          {movie.title}
          <div className="Feed__genres">
            {movie.genres
              .slice()
              .sort()
              .join(', ')}
          </div>
          <div className="Feed__view-date">
            {moment(movie.views[0]).fromNow()}
          </div>
        </div>
        <div className="Feed__rating">{movie.rating}</div>
      </li>
    )
  }
}

export default FeedItem
