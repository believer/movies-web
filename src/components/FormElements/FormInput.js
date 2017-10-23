// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import './FormInput.css'
import FormLabel from '../FormElements/FormLabel'
import FormError from './FormError'

type Props = {
  name: string,
  placeholder: string,
  required?: boolean,
  type?: string
}

type Context = {
  formik: {
    touched: Object,
    errors: Object
  }
}

const FormInput = (
  { name, placeholder, required, type }: Props,
  { formik }: Context
) => {
  const error = formik.errors[name]
  const touched = formik.touched[name]

  return (
    <div>
      <FormLabel htmlFor={name} label={placeholder} required={required} />
      <div className="FormInput__wrap">
        <Field
          className="FormInput"
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
        />
      </div>
      {!!error && touched && <FormError error={error} />}
    </div>
  )
}

FormInput.defaultProps = {
  type: 'text',
}

FormInput.contextTypes = {
  formik: PropTypes.object,
}

export default FormInput
