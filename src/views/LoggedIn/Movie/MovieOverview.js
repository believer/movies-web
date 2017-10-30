import styled from 'styled-components'

const MovieOverview = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5em;
  max-width: 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    max-width: 100%;
  }
`

export default MovieOverview
