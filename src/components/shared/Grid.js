import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${({ columns }) => columns || 1},
    ${({ columnWidth }) => columnWidth || '1fr'}
  );
  grid-column-gap: ${({ columnGap }) => columnGap || 0};
  grid-row-gap: ${({ rowGap }) => rowGap || 0};
`

export default Grid
