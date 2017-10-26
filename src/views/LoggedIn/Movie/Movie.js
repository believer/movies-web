// @flow

import './Movie.css'
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import type { ApolloBaseData } from '../../../types'
import Genre from './Genre'
import Poster from './Poster'
import Backdrop from './Backdrop'
import FlexWrap from './FlexWrap'
import MetaSubtitle from './MetaSubtitle'
import tmdbLink from '../../../utils/tmdbLink'

type Props = {
  data: ApolloBaseData & {
    movie?: {
      actors: string[],
      backdrop: string,
      composers: string[],
      directors: string[],
      genres: string[],
      title: string,
      poster: string,
      runtime: number,
      id: string,
      user: {
        id: string
      }
    }
  }
}

const Movie = ({ data: { error, loading, movie } }: Props) => {
  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) {
    return <div>Loading</div>
  }

  if (!movie) {
    return null
  }

  return (
    <div className="Movie">
      <div className="Movie__meta">
        <Poster src={tmdbLink(movie.poster, 500, 'poster')} />

        <h1>{movie.title}</h1>

        <MetaSubtitle>Genres</MetaSubtitle>

        <FlexWrap>
          {movie.genres.map((genre, i) => (
            <Genre key={`genre-${i}`}>{genre}</Genre>
          ))}
        </FlexWrap>

        <MetaSubtitle>Runtime</MetaSubtitle>
        {movie.runtime}

        <MetaSubtitle>Director</MetaSubtitle>
        <ul>
          {movie.directors.map((person, i) => (
            <li key={`director-${i}`}>{person}</li>
          ))}
        </ul>
      </div>

      <div className="Movie__content">
        {movie.backdrop !== '' && (
          <Backdrop
            style={{
              backgroundImage: tmdbLink(movie.backdrop, 1280, 'backdrop'),
            }}
          />
        )}

        <MetaSubtitle>Cast</MetaSubtitle>
        <ul>
          {movie.actors.map((person, i) => (
            <li key={`actor-${i}`}>{person}</li>
          ))}
        </ul>

        <MetaSubtitle>Composer</MetaSubtitle>
        <ul>
          {movie.composers.map((person, i) => (
            <li key={`composer-${i}`}>{person}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const MovieQuery = gql`
  query movie($movieId: String!) {
    movie(id: $movieId) {
      actors
      backdrop
      countries
      directors
      genres
      id
      languages
      composers
      title
      production_companies
      poster
      release_date
      overview
      runtime
      tagline
      wilhelm
      writers
      year
    }
  }
`

export default graphql(MovieQuery, {
  options: ({ match }) => ({
    variables: {
      movieId: match.params.id,
    },
  }),
})(Movie)
