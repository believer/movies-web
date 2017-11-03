import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../../components/Loading/Loading'
import format from 'date-fns/format'

const Profile = ({
  data: {
    error,
    loading,
    users,
    watches,
    userMoviesPerYear,
    userRuntime,
    views,
  },
}) => {
  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) {
    return <Loading />
  }

  const user = users[0]

  console.log(views)

  return (
    <div>
      <div>{user.name}</div>
      <div>{user.email}</div>

      <h3>Views</h3>
      <div>{watches.total_views}</div>
      <div>{watches.views_with_rewatches}</div>

      <h3>Runtime</h3>
      <div>{userRuntime.total_with_rewatches.years} years</div>
      <div>{userRuntime.total_with_rewatches.days} days</div>
      <div>{userRuntime.total_with_rewatches.hours} hours</div>
      <div>{userRuntime.total_with_rewatches.minutes} minutes</div>

      <h3>Per year</h3>
      <div>
        {userMoviesPerYear.map((year, i) => (
          <div key={i}>
            {year.year} - {year.count}
          </div>
        ))}
      </div>

      <h3>Views</h3>
      <div>
        {views.map((movie, i) => (
          <div key={i}>
            <h4>{movie.title}</h4>
            {movie.dates.map((date, i) => (
              <div key={`date-${i}`}>{format(date.date, 'YYYY-MM-DD')}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const ProfileQuery = gql`
  query profile {
    users(id: 2) {
      name
      email
    }
    watches {
      total_views
      views_with_rewatches
    }
    userMoviesPerYear {
      count
      year
    }
    userRuntime {
      total_with_rewatches {
        ...runtime
      }
      total {
        ...runtime
      }
    }
    views(limit: 20) {
      movie_id
      title
      dates {
        date
      }
      views_count
    }
  }

  fragment runtime on Runtime {
    days
    minutes
    hours
    years
  }
`

export default graphql(ProfileQuery)(Profile)
