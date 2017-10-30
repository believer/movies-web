// @flow

import React from 'react'
import { withApollo } from 'react-apollo'
import MetaSubtitle from './MetaSubtitle'
import PersonList from './PersonList'
import Link from '../../../components/Link/Link'
import { Margin } from 'styled-components-spacing'
import { PersonQuery } from '../Person/Person'

type PersonType = 'actor' | 'composer' | 'director' | 'producer' | 'writer'

type Props = {
  client: {
    query: Function
  },
  persons: string[],
  roleType: PersonType,
  title: string
}

const MovieList = ({ client, persons, roleType, title }: Props) => {
  if (!persons || !persons.length) {
    return null
  }

  const prefetchPerson = (name: string, role: PersonType) => () => {
    client.query({
      query: PersonQuery,
      variables: {
        name,
        role,
      },
    })
  }

  return (
    <Margin bottom="30">
      <MetaSubtitle>{title}</MetaSubtitle>
      <PersonList>
        {persons.map((person, i) => (
          <Link
            key={`${roleType}-${i}`}
            onMouseEnter={prefetchPerson(person, roleType)}
            to={`/dashboard/person/${roleType}/${person}`}
          >
            {person}
          </Link>
        ))}
      </PersonList>
    </Margin>
  )
}

export default withApollo(MovieList)
