import styled from 'styled-components'

const Backdrop = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  bottom: 0;
  filter: blur(50px);
  left: 0;
  opacity: 0.15;
  position: absolute;
  right: 0;
  transform: scale(2);
  top: 0;
`

export default Backdrop
