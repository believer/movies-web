// @flow

import React from 'react'
import MetaSubtitle from './MetaSubtitle'
import PersonList from './PersonList'
import Link from '../../../components/Link/Link'
import { Margin } from 'styled-components-spacing'

type Props = {
  persons: string[],
  roleType: string,
  title: string
}

const MovieList = ({ persons, roleType, title }: Props) => {
  if (!persons || !persons.length) {
    return null
  }

  return (
    <Margin bottom="30">
      <MetaSubtitle>{title}</MetaSubtitle>
      <PersonList>
        {persons.map((person, i) => (
          <Link
            key={`${roleType}-${i}`}
            to={`/dashboard/person/${roleType}/${person}`}
          >
            {person}
          </Link>
        ))}
      </PersonList>
    </Margin>
  )
}

export default MovieList
