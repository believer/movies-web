// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import { Formik, Form } from 'formik'
import type { RouterHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import yup from 'yup'
import FormInput from '../../../components/FormElements/FormInput'
import FormCheckbox from '../../../components/FormElements/FormCheckbox'
import Button from '../../../components/Button/Button'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'

type Props = {
  history: RouterHistory,
  mutate: Function
}

const Wrap = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
`

const AddMovieForm = styled(Form)`
  background-color: #fff;
  border: 1px solid #e7e8e9;
  border-radius: 5px;
  padding: 40px;
  width: 100%;
`

const AddMovie = ({ history, mutate }: Props) => {
  return (
    <Wrap>
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
          <Padding all={{ xs: '20', md: '60' }}>
            <AddMovieForm>
              <FormInput name="imdbId" placeholder="IMDb ID" />
              <FormInput name="rating" placeholder="Rating" type="tel" />
              <FormInput name="date" placeholder="Date" type="date" />
              <FormCheckbox
                name="wilhelm"
                placeholder="Wilhelm"
                type="checkbox"
              />
              <Button disabled={!isValid} type="submit">
                Add movie
              </Button>
            </AddMovieForm>
          </Padding>
        )}
        validationSchema={yup.object().shape({
          imdbId: yup
            .string()
            .matches(/tt\d+/, 'Invalid IMDb URL or ID')
            .required('IMDb ID is required'),
          rating: yup
            .number()
            .min(1, 'Lowest rating is 1')
            .max(10, 'Maximum rating is 10'),
          date: yup.date(),
          wilhelm: yup.boolean(),
        })}
      />
    </Wrap>
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
