// @flow

import React from 'react'
import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Loading from '../../../components/Loading/Loading'
import Gravatar from '../../../components/Gravatar/Gravatar'
import format from 'date-fns/format'
import styled from 'styled-components'
import { Margin, Padding } from 'styled-components-spacing'
import { Line } from 'react-chartjs-2'

type User = {
  email?: string,
  name?: string
}

type CountWithYear = {
  count: number,
  year: string
}

type Watches = {
  views_with_rewatches: number,
  total_views: number
}

type Runtime = {
  days: number,
  minutes: number,
  hours: number,
  years: number
}

type ViewDate = {
  date: string
}

type View = {
  movie_id: number,
  title: string,
  dates: ViewDate[],
  views_count: number
}

type Props = {
  data: {
    error: ?{
      message: string
    },
    loading: boolean,
    users: User[],
    watches: Watches,
    userMoviesPerYear: CountWithYear,
    userRuntime: {
      total_with_rewatches: Runtime,
      total: Runtime
    },
    views: View[]
  }
}

const Center = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const PerYear = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
`

const BigValue = styled.div`
  font-size: 32px;
  font-weight: 700;
`

const SmallValue = styled.div`
  color: #999;
  font-size: 14px;
  font-weight: 300;
`

const MovieTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`

const SectionTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns || 1}, 1fr);
  grid-column-gap: ${({ columnGap }) => columnGap || 0};
  grid-row-gap: ${({ rowGap }) => rowGap || 0};
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
`

const GridItem = styled.div`text-align: center;`

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
}: Props) => {
  if (error) {
    return <div>{error.message}</div>
  }

  if (loading) {
    return <Loading />
  }

  const user = users[0]
  const perYear = userMoviesPerYear.slice(0, 6).reverse()

  const data = {
    labels: perYear.map(y => y.year),
    datasets: [
      {
        label: 'Movies per year',
        fill: true,
        lineTension: 0.2,
        backgroundColor: 'rgba(241, 102, 133, 0.3)',
        borderColor: 'rgba(241, 102, 133, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'round',
        pointBorderColor: 'rgba(241, 102, 133, 1)',
        pointBackgroundColor: 'rgba(241, 102, 133, 1)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(241, 102, 133, 1)',
        pointHoverBorderColor: 'rgba(241, 102, 133, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: perYear.map(y => y.count),
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
          },
        },
      ],
    },
  }

  return (
    <div>
      <Padding all={{ md: '60' }}>
        <Center>
          <Gravatar email={user.email} size={150} />
          <Margin top="20">
            <BigValue>{user.name}</BigValue>
            <SmallValue>{user.email}</SmallValue>
          </Margin>
        </Center>
      </Padding>

      <Padding bottom="60" top="30">
        <Grid columns={2}>
          <GridItem>
            <BigValue>{watches.total_views}</BigValue>
            <SmallValue>Total views</SmallValue>
          </GridItem>
          <GridItem>
            <BigValue>{watches.views_with_rewatches}</BigValue>
            <SmallValue>Total views including rewatches</SmallValue>
          </GridItem>
        </Grid>
      </Padding>

      <Padding bottom="60" top="30">
        <Grid columns={4}>
          <GridItem>
            <BigValue>
              {userRuntime.total_with_rewatches.years.toFixed(2)}
            </BigValue>
            <SmallValue>years</SmallValue>
          </GridItem>
          <GridItem>
            <BigValue>{userRuntime.total_with_rewatches.days}</BigValue>
            <SmallValue>days</SmallValue>
          </GridItem>
          <GridItem>
            <BigValue>{userRuntime.total_with_rewatches.hours}</BigValue>
            <SmallValue>hours</SmallValue>
          </GridItem>
          <GridItem>
            <BigValue>{userRuntime.total_with_rewatches.minutes}</BigValue>
            <SmallValue>minutes</SmallValue>
          </GridItem>
        </Grid>
      </Padding>

      <PerYear>
        <h3>Movies per year</h3>
        <Line data={data} height={200} options={options} />
      </PerYear>

      <Padding bottom="60" top="60">
        <Center>
          <Margin bottom="60">
            <SectionTitle>Most watched</SectionTitle>
          </Margin>
          <Grid columnGap="20px" columns={2} rowGap="20px">
            {views.map((movie, i) => (
              <GridItem key={i}>
                <MovieTitle>{movie.title}</MovieTitle>
                {movie.dates.map((date, i) => (
                  <Margin key={`date-${i}`} top="10">
                    <SmallValue>{format(date.date, 'YYYY-MM-DD')}</SmallValue>
                  </Margin>
                ))}
              </GridItem>
            ))}
          </Grid>
        </Center>
      </Padding>
    </div>
  )
}

const ProfileQuery = gql`
  query profile($id: Int!) {
    users(id: $id) {
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

export default compose(
  withApollo,
  graphql(ProfileQuery, {
    options: ({ match }) => ({
      variables: {
        id: parseInt(match.params.id, 10),
      },
    }),
  })
)(Profile)
