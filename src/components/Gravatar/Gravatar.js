// @flow

import './Gravatar.css'
import React from 'react'
import md5 from 'md5'
import classnames from 'classnames'

type Props = {
  alt?: string,
  className?: string,
  email: string,
  size: number
}

const Gravatar = ({ className, email, alt, size }: Props) => {
  if (!email) {
    return null
  }

  let gravatar = `https://www.gravatar.com/avatar/${md5(email)}`

  if (size) {
    gravatar = `${gravatar}&s=${size}`
  }

  return (
    <div
      className={classnames('Gravatar', className)}
      style={{ maxWidth: size, width: size, height: size }}
    >
      <img alt={alt} className="Gravatar__image" src={gravatar} />
    </div>
  )
}

Gravatar.defaultProps = {
  email: '',
}

export default Gravatar
