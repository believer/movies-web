// @flow

import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import type { RouterHistory } from 'react-router-dom'

type Props = {
  mutate: Function,
  history: RouterHistory
}

class Register extends Component<Props> {
  handleSubmit = async values => {
    console.log(values)
  }

  render () {
    return (
      <div className="register">
        <p>register</p>
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

export default graphql(LoginMutation)(Register)
