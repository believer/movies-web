// @flow

import React from 'react'
import Gravatar from '../../../components/Gravatar/Gravatar'
import moment from 'moment'
import { createFragmentContainer, graphql } from 'react-relay'

type Props = {
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
  }[],
  history: {
    push: string => void
  }
}

const Feed = ({ feed, history }: Props) => {
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

export default createFragmentContainer(
  Feed,
  graphql`
    fragment Feed_feed on Movie @relay(plural: true) {
      genres
      id
      rating
      title
      user {
        email
      }
      views
    }
  `
)
