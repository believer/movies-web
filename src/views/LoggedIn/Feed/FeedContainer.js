// @flow

import './Feed.css'
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from '../../../createRelayEnvironment'
import Feed from './Feed'

type Props = {
  error?: {
    message: string
  },
  props: {
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
  }
}

const FeedContainerQuery = graphql`
  query FeedContainerQuery {
    feed {
      ...Feed_feed
    }
  }
`

const FeedContainer = ({ history }: { history: Object }) => {
  return (
    <QueryRenderer
      environment={environment}
      query={FeedContainerQuery}
      render={({ error, props }: Props) => {
        if (error) {
          return <div>{error.message}</div>
        } else if (props) {
          return <Feed feed={props.feed} history={history} />
        }

        return <div>Loading</div>
      }}
    />
  )
}

export default FeedContainer
