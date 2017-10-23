// @flow

import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import gql from 'graphql-tag'
import './Login.css'
import FormInput from '../../components/FormElements/FormInput'
import Button from '../../components/Button/Button'

type Props = {
  mutate: Function,
  history: {
    push: string => void
  }
}

class Login extends Component<Props> {
  handleSubmit = async values => {
    const result = await this.props.mutate({
      variables: {
        input: {
          ...values,
        },
      },
    })

    localStorage.setItem('token', result.data.login.token)
    this.props.history.push('/dashboard/feed')
  }

  render () {
    return (
      <div className="Login">
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={this.handleSubmit}
          render={() => (
            <Form className="Login__form">
              <FormInput name="username" placeholder="Username" />
              <FormInput
                name="password"
                placeholder="Password"
                type="password"
              />
              <Button type="submit">Login</Button>
            </Form>
          )}
        />
      </div>
    )
  }
}

const LoginMutation = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`

export default graphql(LoginMutation)(Login)
