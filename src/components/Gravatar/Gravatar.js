// @flow

import React from 'react'
import md5 from 'md5'
import styled from 'styled-components'

type Props = {
  alt?: string,
  email?: string,
  size?: number
}

const Wrap = styled.div`flex: 1;`

const GravatarImage = styled.img`
  border-radius: 100%;
  display: block;
  max-width: 100%;
`

const Gravatar = ({ email, alt, size }: Props) => {
  if (!email) {
    return null
  }

  let gravatar = `https://www.gravatar.com/avatar/${md5(email)}`

  if (size) {
    gravatar = `${gravatar}?
    s=${size}`
  }

  return (
    <Wrap style={{ maxWidth: size, width: size, height: size }}>
      <GravatarImage alt={alt} src={gravatar} />
    </Wrap>
  )
}

export default Gravatar
