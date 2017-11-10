import styled from 'styled-components'

const PersonList = styled.div`
  align-items: flex-start;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  max-width: 960px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    grid-template-columns: 1fr;
  }
`

export default PersonList
