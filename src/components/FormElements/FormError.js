// @flow

import React from 'react'
import './FormError.css'

type Props = {
  error: string
}

const FormError = ({ error }: Props) => {
  return <div className="FormError">{error}</div>
}

export default FormError
