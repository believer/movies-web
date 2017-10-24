import styled from 'styled-components'

const FormError = styled.div`
  background: red;
  border: 1px solid red;
  border-radius: 5px;
  color: #333;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px 15px;
  position: relative;

  &:before,
  &:after {
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    bottom: 100%;
    content: '';
    height: 0;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: 0;
  }

  &:before {
    border-bottom: 7px solid red;
    z-index: 1;
  }

  &:after {
    border-bottom: 7px solid red;
    bottom: calc(100% + 1px);
  }
`

export default FormError
