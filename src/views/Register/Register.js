// @flow

import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Formik, Form } from 'formik'
import type { RouterHistory } from 'react-router-dom'
import FormInput from '../../components/FormElements/FormInput'
import Button from '../../components/Button/Button'
import yup from 'yup'
import './Register.css'

type Props = {
  mutate: Function,
  history: RouterHistory
}

class Register extends Component<Props> {
  handleSubmit = async (values, actions) => {
    try {
      const result = await this.props.mutate({
        variables: {
          input: {
            ...values,
          },
        },
      })
      const { name } = result.data.register

      this.props.history.push(`/login?register=true&registerName=${name}`)
    } catch(err) {
      if (err.message.includes('email')) {
        actions.setFieldError('email', 'Invalid email')
      }
    }
  }

  render () {
    return (
      <div className="Register">
        <Formik
          initialValues={{ email: '', password: '', name: '' }}
          onSubmit={this.handleSubmit}
          render={() => (
            <Form className="Register__form">
              <FormInput name="name" placeholder="Name" />
              <FormInput
                name="email"
                placeholder="Email"
                type="email" />
              <FormInput
                name="password"
                placeholder="Password"
                type="password"
              />
              <Button type="submit">Register</Button>
            </Form>
          )}
          validationSchema={yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
          })}
        />
      </div>
    )
  }
}

const RegisterMutation = gql`
mutation register($input: RegisterInput!) {
  register(input: $input) {
    name
    email
  }
}
`

export default graphql(RegisterMutation)(Register)
