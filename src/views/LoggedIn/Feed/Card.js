import styled from 'styled-components'

export const Card = styled.div`
  border: 1px solid #e7e8e9;
  border-radius: 5px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 77px 1fr 50px;
  transition: transform 300ms ease-in-out, box-shadow 300ms ease-in-out;

  &:hover {
    box-shadow: 0 5px 20px 5px rgba(33, 33, 33, 0.1);
    transform: scale(1.01);
  }
`

export const CardContent = styled.div`
  align-items: center;
  background-color: #fff;
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-column-gap: 20px;
  padding: 15px 20px;
`

export const CardPoster = styled.img`
  border-radius: 5px 0 0 5px;
  vertical-align: top;
  width: 100%;
`

export const CardTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const CardMeta = styled.div``
