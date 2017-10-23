// @flow

import './AddMovie.css'
import React from 'react'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import gql from 'graphql-tag'
import yup from 'yup'
import FormInput from '../../../components/FormElements/FormInput'
import Button from '../../../components/Button/Button'

type Props = {
  mutate: Function
}

const AddMovie = ({ mutate }: Props) => {
  return (
    <Formik
      initialValues={{ imdbId: '', rating: 0 }}
      onSubmit={values => {
        mutate({
          variables: {
            input: {
              ...values,
            },
          },
        })
      }}
      render={({ isValid }) => (
        <Form className="AddMovie">
          <FormInput name="imdbId" placeholder="IMDb ID" />
          <FormInput
            min="0"
            max="10"
            name="rating"
            placeholder="Rating"
            type="number"
          />
          <Button disabled={!isValid} type="submit">
            Add movie
          </Button>
        </Form>
      )}
      validationSchema={yup.object().shape({
        imdbId: yup.string().required(),
        rating: yup
          .number()
          .min(0)
          .max(10),
      })}
    />
  )
}

const InsertMovieMutation = gql`
  mutation insertMovie($input: MovieInput!) {
    insertMovie(input: $input) {
      title
    }
  }
`

export default graphql(InsertMovieMutation, {
  options: {
    refetchQueries: ['feed'],
  },
})(AddMovie)
