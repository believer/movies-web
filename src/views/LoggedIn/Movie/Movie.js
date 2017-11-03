// @flow

import './Movie.css'
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import type { ApolloBaseData } from '../../../types'
import Genre from './Genre'
import Poster from './Poster'
import Backdrop from './Backdrop'
import Loading from '../../../components/Loading/Loading'
import Link from '../../../components/Link/Link'
import MovieTitle from './MovieTitle'
import MovieContent from './MovieContent'
import DirectorList from './DirectorList'
import MovieOverview from './MovieOverview'
import Duration from './Duration'
import MovieList from './MovieList'
import FlexWrap from './FlexWrap'
import MetaSubtitle from './MetaSubtitle'
import tmdbLink from '../../../utils/tmdbLink'
import format from 'date-fns/format'

type Props = {
  data: ApolloBaseData & {
    movie?: {
      actors: string[],
      backdrop: string,
      composers: string[],
      directors: string[],
      genres: string[],
      title: string,
      overview: string,
      poster: string,
      producers: string[],
      runtime: number,
      id: string,
      user: {
        id: string
      },
      writers: string[]
    }
  }
}

const Movie = ({ data: { error, loading, movie } }: Props) => {
  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) {
    return <Loading />
  }

  if (!movie) {
    return null
  }

  return (
    <div className="Movie">
      <div className="Movie__meta">
        <Poster src={tmdbLink(movie.poster, 500, 'poster')} />

        <MovieTitle>{movie.title}</MovieTitle>

        <MetaSubtitle>Release date</MetaSubtitle>
        <p>{format(movie.release_date, 'D MMMM YYYY')}</p>

        <MetaSubtitle>Genres</MetaSubtitle>

        <FlexWrap>
          {movie.genres.map((genre, i) => (
            <Genre key={`genre-${i}`}>{genre}</Genre>
          ))}
        </FlexWrap>

        <MetaSubtitle>Runtime</MetaSubtitle>
        <Duration runtime={movie.runtime} />

        <MetaSubtitle>Director</MetaSubtitle>
        <DirectorList>
          {movie.directors.map((person, i) => (
            <Link
              key={`director-${i}`}
              to={`/dashboard/person/director/${person}`}
            >
              {person}
            </Link>
          ))}
        </DirectorList>
      </div>

      <div className="Movie__content">
        {movie.backdrop !== '' && (
          <Backdrop src={tmdbLink(movie.backdrop, 1280, 'backdrop')} />
        )}

        <MovieContent>
          <MetaSubtitle>Story</MetaSubtitle>
          <MovieOverview>{movie.overview}</MovieOverview>

          <MovieList persons={movie.actors} roleType="actor" title="Cast" />

          <MovieList
            persons={movie.composers}
            roleType="composer"
            title="Composer"
          />

          <MovieList
            persons={movie.producers}
            roleType="producer"
            title="Producers"
          />
          <MovieList
            persons={movie.writers}
            roleType="writer"
            title="Writers"
          />
        </MovieContent>
      </div>
    </div>
  )
}

export const MovieQuery = gql`
  query movie($id: String!) {
    movie(id: $id) {
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
      producers
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
      id: match.params.id,
    },
  }),
})(Movie)
