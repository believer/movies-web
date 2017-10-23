// @flow

import './Feed.css'
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Gravatar from '../../../components/Gravatar/Gravatar'
import moment from 'moment'

type Props = {
  data: {
    error?: {
      message: string
    },
    loading: boolean,
    feed: {
      genres: string[],
      title: string,
      id: string,
      rating: number,
      user: {
        email: string,
        id: string
      },
      views: string[]
    }[]
  },
  history: {
    push: string => void
  }
}

const Feed = ({ data: { error, loading, feed }, history }: Props) => {
  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <ul className="Feed">
      {feed.map((movie, i) => (
        <li
          className="Feed__movie"
          key={`movie-${i}`}
          onClick={() => history.push(`/dashboard/movie/${movie.id}`)}
        >
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
      ))}
    </ul>
  )
}

export const FeedQuery = gql`
  query feed {
    feed(limit: 10) {
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
  }
`

export default graphql(FeedQuery)(Feed)
