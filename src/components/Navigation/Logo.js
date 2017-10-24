import styled from 'styled-components'

const Logo = styled.div`
  align-items: center;
  background-color: ${props => props.theme.primary};
  color: #fff;
  display: flex;
  font-weight: 700;
  margin-right: 40px;
  padding: 20px;
  text-transform: uppercase;
`

export default Logo
