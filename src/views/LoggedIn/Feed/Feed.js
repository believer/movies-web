// @flow

import './Feed.css'
import React from 'react'
import { graphql } from 'react-apollo'
import { filter } from 'graphql-anywhere'
import gql from 'graphql-tag'
import FeedItem from './FeedItem'
import type { RouterHistory } from 'react-router-dom'
import type { ApolloBaseData } from '../../../types'

export type FeedMovie = {
  genres: string[],
  title: string,
  id: string,
  rating: number,
  user: {
    email: string,
    id: string
  },
  views: string[]
}

type Props = {
  data: ApolloBaseData & { feed: FeedMovie[] },
  history: RouterHistory
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
        <FeedItem
          history={history}
          key={`movie-${i}`}
          movie={filter(FeedItem.fragments.movie, movie)}
        />
      ))}
    </ul>
  )
}

export const FeedQuery = gql`
  query feed {
    feed(limit: 10) {
      ... FeedItemMovie
    }
  }

  ${FeedItem.fragments.movie}
`

export default graphql(FeedQuery)(Feed)
