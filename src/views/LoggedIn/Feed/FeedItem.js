// @flow

import React, { Component } from 'react'
import gql from 'graphql-tag'
import Gravatar from '../../../components/Gravatar/Gravatar'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import type { FeedMovie } from './Feed'
import type { RouterHistory } from 'react-router-dom'
import Card from './Card'
import FeedDate from './FeedDate'
import FeedItemGenres from './FeedItemGenres'
import { Margin } from 'styled-components-spacing'

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
        <Margin left="20">
          {movie.title}
          <FeedItemGenres>
            {movie.genres
              .slice()
              .sort()
              .join(', ')}
          </FeedItemGenres>
          <FeedDate>
            {distanceInWordsToNow(movie.views[movie.views.length - 1])}
          </FeedDate>
        </Margin>
        <Margin left="auto">{movie.rating}</Margin>
      </Card>
    )
  }
}

export default FeedItem
