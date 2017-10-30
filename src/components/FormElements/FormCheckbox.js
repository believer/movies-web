import React from 'react'
import styled from 'styled-components'
import FormLabel from './FormLabel'
import { Margin } from 'styled-components-spacing'
import { Field } from 'formik'

type Props = {
  name: string,
  placeholder: string,
  required?: boolean
}

const CheckboxInput = styled(Field)`display: none;`

const Checkbox = styled.label`
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
  height: 20px;
  padding: 2px;
  width: 20px;

  ${CheckboxInput}:checked + & {
    background-color: ${({ theme }) => theme.primary};
  }
`

const FormCheckbox = ({ name, placeholder, required }: Props) => {
  return (
    <Margin bottom="20">
      <FormLabel htmlFor={name} label={placeholder} required={required} />
      <CheckboxInput id={name} name={name} type="checkbox" />
      <Checkbox htmlFor={name} />
    </Margin>
  )
}

export default FormCheckbox
