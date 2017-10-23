// @flow

import './Movie.css'
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import type { ApolloBaseData } from '../../../types'

type Props = {
  data: ApolloBaseData & {
    movie: {
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

  return (
    <div className="Movie">
      <div className="Movie__meta">
        <div className="Movie__poster">
          <img
            alt="Poster"
            className="Movie__poster-image"
            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
          />
          <img
            alt="Poster shadow"
            className="Movie__poster-shadow"
            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
          />
        </div>
        <h1>{movie.title}</h1>

        <h4>Genres</h4>
        <ul className="Movie__genres">
          {movie.genres.map((genre, i) => (
            <li className="Movie__genre" key={`genre-${i}`}>
              {genre}
            </li>
          ))}
        </ul>
        {movie.runtime}

        <h4>Director</h4>
        <ul>
          {movie.directors.map((person, i) => (
            <li key={`person-${i}`}>{person}</li>
          ))}
        </ul>
      </div>
      <div className="Movie__content">
        {movie.backdrop !== '' && (
          <div
            className="Movie__backdrop"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop})`,
            }}
          />
        )}
        <ul>
          {movie.actors.map((person, i) => (
            <li key={`person-${i}`}>{person}</li>
          ))}
        </ul>

        <ul>
          {movie.composers.map((person, i) => (
            <li key={`person-${i}`}>{person}</li>
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
