import styled from 'styled-components'

const FeedRating = styled.div`
  align-items: center;
  background-color: ${({ children, theme }) => {
    const rating = parseInt(children, 10)

    if (rating < 3) {
      return `${theme.primary}60`
    } else if (rating < 6) {
      return `${theme.medium}60`
    }

    return `${theme.success}60`
  }};
  border-radius: 0 5px 5px 0;
  box-shadow: inset 1px 0 5px 0 rgba(33, 33, 33, 0.1);
  display: flex;
  font-size: 18px;
  justify-content: center;
`

export default FeedRating
