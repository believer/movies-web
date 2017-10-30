// @flow

import React from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import type { ApolloBaseData } from '../../../types'
import Link from '../../../components/Link/Link'
import Loading from '../../../components/Loading/Loading'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import format from 'date-fns/format'
import tmdbLink from '../../../utils/tmdbLink'
import truncate from 'truncate'
import { MovieQuery } from '../Movie/Movie'

type Props = {
  client: {
    query: Function
  },
  data: ApolloBaseData & {
    person?: {
      id: string,
      overview: string,
      poster: string,
      release_date: string,
      title: string
    }[]
  },
  match: {
    params: {
      name: string,
      role: string
    }
  }
}

const PersonWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
`

const PersonMovies = styled.div`
  display: grid;
  grid-column-gap: 60px;
  grid-row-gap: 40px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`

const PersonMovie = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: 92px 1fr;
`

const MovieTitle = styled.h3`margin-top: 0;`

const MovieOverview = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5em;
`

const Person = ({ client, data: { error, loading, person }, match }: Props) => {
  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) {
    return <Loading />
  }

  if (!person) {
    return null
  }

  const prefetchMovie = (id: string) => () => {
    client.query({
      query: MovieQuery,
      variables: {
        id,
      },
    })
  }

  return (
    <Padding all={{ xs: '20', md: '60' }}>
      <PersonWrap>
        <h2>{match.params.name}</h2>
        <h4>{person.length} movies</h4>

        <PersonMovies>
          {person.map(movie => (
            <PersonMovie key={movie.id} onMouseEnter={prefetchMovie(movie.id)}>
              <Link to={`/dashboard/movie/${movie.id}`}>
                <img src={tmdbLink(movie.poster, 92, 'poster')} alt="" />
              </Link>
              <div>
                <MovieTitle>
                  <Link to={`/dashboard/movie/${movie.id}`}>
                    {movie.title} ({format(movie.release_date, 'YYYY')})
                  </Link>
                </MovieTitle>
                <MovieOverview>{truncate(movie.overview, 200)}</MovieOverview>
              </div>
            </PersonMovie>
          ))}
        </PersonMovies>
      </PersonWrap>
    </Padding>
  )
}

export const PersonQuery = gql`
  query person($name: String!, $role: PersonType!) {
    person(name: $name, role: $role) {
      id
      overview
      poster
      title
      release_date
    }
  }
`

export default compose(
  withApollo,
  graphql(PersonQuery, {
    options: ({ match }) => ({
      variables: {
        name: match.params.name,
        role: match.params.role,
      },
    }),
  })
)(Person)
