// @flow

import React from 'react'
import './Button.css'

type Props = {
  children: string,
  disabled?: boolean,
  type: string
}

const Button = ({ children, disabled, type }: Props) => {
  return (
    <button className="Button" disabled={disabled} type={type}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
}

export default Button
