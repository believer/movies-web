import React from 'react'
import PropTypes from 'prop-types'

const FormDebugger = (_, { formik }) => {
  return (
    <div>
      <h4>Errors</h4>
      <pre>{JSON.stringify(formik.errors, null, 2)}</pre>
      <h4>Touched</h4>
      <pre>{JSON.stringify(formik.touched, null, 2)}</pre>
      <h4>Values</h4>
      <pre>{JSON.stringify(formik.values, null, 2)}</pre>
    </div>
  )
}

FormDebugger.contextTypes = {
  formik: PropTypes.object,
}

export default FormDebugger
