import styled from 'styled-components'

const FeedContent = styled.div`
  border-bottom: 1px solid #eee;
  display: grid;
  grid-template-columns: 120px 1fr;
  margin-bottom: 40px;
  padding-bottom: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`

export default FeedContent
