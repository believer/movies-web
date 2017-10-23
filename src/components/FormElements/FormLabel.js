// @flow

import React from 'react'
import './FormLabel.css'

type Props = {
  htmlFor: string,
  label: string,
  required?: boolean
}

const FormLabel = ({ htmlFor, label, required }: Props) => {
  return (
    <label className="FormLabel" htmlFor={htmlFor}>
      {label}
      {required && <span className="FormLabel__required">*</span>}
    </label>
  )
}

export default FormLabel
