// @flow

import React, { Component } from 'react'
import gql from 'graphql-tag'
import Gravatar from '../../../components/Gravatar/Gravatar'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import type { FeedMovie } from './Feed'
import type { RouterHistory } from 'react-router-dom'
import { Card, CardContent, CardPoster, CardTitle, CardMeta } from './Card'
import FeedDate from './FeedDate'
import FeedRating from './FeedRating'
import FeedItemGenres from './FeedItemGenres'
import { withApollo } from 'react-apollo'
import { MovieQuery } from '../Movie/Movie'
import tmdbLink from '../../../utils/tmdbLink'

type Props = {
  client: {
    query: Function
  },
  movie: FeedMovie,
  history: RouterHistory
}

class FeedItem extends Component<Props> {
  static fragments = {
    movie: gql`
      fragment FeedItemMovie on Movie {
        backdrop
        genres
        id
        title
        rating
        poster
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

  prefetchMovie = (id: string) => () => {
    this.props.client.query({
      query: MovieQuery,
      variables: {
        id,
      },
    })
  }

  render () {
    const { movie } = this.props

    return (
      <Card
        onClick={this.handleClick}
        onMouseEnter={this.prefetchMovie(movie.id)}
      >
        <CardPoster src={tmdbLink(movie.poster, 154, 'poster')} alt="" />
        <CardContent>
          <CardMeta>
            <CardTitle>{movie.title}</CardTitle>
            <FeedItemGenres>
              {movie.genres
                .slice()
                .sort()
                .join(', ')}
            </FeedItemGenres>
            <FeedDate>
              {distanceInWordsToNow(movie.views[movie.views.length - 1])}
            </FeedDate>
          </CardMeta>
          <Gravatar email={movie.user.email} size={30} />
        </CardContent>
        <FeedRating>{movie.rating}</FeedRating>
      </Card>
    )
  }
}

export default withApollo(FeedItem)
