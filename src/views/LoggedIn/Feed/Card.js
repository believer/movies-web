import styled from 'styled-components'

const Card = styled.li`
  align-items: center;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 10px 20px 0 rgba(33, 33, 33, 0.07);
  cursor: pointer;
  display: flex;
  padding: 15px 20px;
  transition: transform 300ms ease-in-out, box-shadow 300ms ease-in-out;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  &:hover {
    box-shadow: 0 5px 20px 5px rgba(33, 33, 33, 0.1);
    transform: scale(1.01);
  }
`

export default Card
