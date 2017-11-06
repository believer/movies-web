// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import { filter } from 'graphql-anywhere'
import gql from 'graphql-tag'
import FeedItem from './FeedItem'
import FeedTitle from './FeedTitle'
import FeedGrid from './FeedGrid'
import FeedContent from './FeedContent'
import type { RouterHistory } from 'react-router-dom'
import type { ApolloBaseData } from '../../../types'
import { Padding } from 'styled-components-spacing'
import Loading from '../../../components/Loading/Loading'
import format from 'date-fns/format'

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
    return <Loading />
  }

  const groupedFeed = feed.reduce((acc, curr) => {
    const viewDate = format(curr.views[curr.views.length - 1], 'YYYY-MM-DD')

    if (!acc[viewDate]) {
      acc[viewDate] = []
    }

    acc[viewDate].push(curr)

    return acc
  }, {})

  return (
    <Padding all={{ xs: '20', md: '60' }}>
      {Object.keys(groupedFeed).map(date => (
        <FeedContent key={`movie-${date}`}>
          <FeedTitle>{date}</FeedTitle>
          <FeedGrid>
            {groupedFeed[date].map((movie, i) => (
              <FeedItem
                history={history}
                key={`movie-${i}-user-${movie.user.id}`}
                movie={filter(FeedItem.fragments.movie, movie)}
              />
            ))}
          </FeedGrid>
        </FeedContent>
      ))}
    </Padding>
  )
}

export const FeedQuery = gql`
  query feed {
    feed(limit: 50) {
      ... FeedItemMovie
    }
  }

  ${FeedItem.fragments.movie}
`

export default graphql(FeedQuery)(Feed)
