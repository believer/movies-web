// @flow

import './AddMovie.css'
import React from 'react'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import type { RouterHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import yup from 'yup'
import FormInput from '../../../components/FormElements/FormInput'
import Button from '../../../components/Button/Button'

type Props = {
  history: RouterHistory,
  mutate: Function
}

const AddMovie = ({ history, mutate }: Props) => {
  return (
    <Formik
      initialValues={{ imdbId: '', rating: 0, date: '', wilhelm: false }}
      onSubmit={values => {
        mutate({
          variables: {
            input: {
              ...values,
            },
          },
        })

        history.push('/dashboard/feed')
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
          <FormInput name="date" placeholder="Date" type="date" />
          <FormInput name="wilhelm" placeholder="Wilhelm" type="checkbox" />
          <Button disabled={!isValid} type="submit">
            Add movie
          </Button>
        </Form>
      )}
      validationSchema={yup.object().shape({
        imdbId: yup.string().required(),
        rating: yup
          .number()
          .min(1)
          .max(10),
        date: yup.date(),
        wilhelm: yup.boolean(),
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
