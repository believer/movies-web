// @flow

import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import gql from 'graphql-tag'
import './Login.css'
import FormInput from '../../components/FormElements/FormInput'
import Button from '../../components/Button/Button'
import type { RouterHistory } from 'react-router-dom'
import { parse } from 'query-string'

type Props = {
  mutate: Function,
  history: RouterHistory
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
    const { register, registerName } = parse(this.props.location.search)

    return (
      <div className="Login">
        {register && <div className="Login__register">Welcome {registerName}! Login and start adding movies!</div>}
        <div className="Login__form-wrapper">
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
