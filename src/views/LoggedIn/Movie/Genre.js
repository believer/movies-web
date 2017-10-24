import styled from 'styled-components'

const Genre = styled.li`
  align-items: center;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  display: flex;
  font-size: 12px;
  margin-bottom: 10px;
  padding: 10px;

  &:not(:last-child) {
    margin-right: 10px;
  }
`
export default Genre
