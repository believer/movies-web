// @flow

import React, { Component } from 'react'
import gql from 'graphql-tag'
import Gravatar from '../../../components/Gravatar/Gravatar'
import moment from 'moment'
import type { FeedMovie } from './Feed'
import type { RouterHistory } from 'react-router-dom'
import Card from './Card'
import FeedItemGenres from './FeedItemGenres'

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
      <Card onClick={this.handleClick}>
        <Gravatar email={movie.user.email} size={40} />
        <div className="Feed__content">
          {movie.title}
          <FeedItemGenres>
            {movie.genres
              .slice()
              .sort()
              .join(', ')}
          </FeedItemGenres>
          <div className="Feed__view-date">
            {moment(movie.views[0]).fromNow()}
          </div>
        </div>
        <div className="Feed__rating">{movie.rating}</div>
      </Card>
    )
  }
}

export default FeedItem
