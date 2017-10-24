import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`position: relative;`

const PosterImage = styled.img`
  border-radius: 4px;
  max-width: 100%;
  position: relative;
  vertical-align: top;
  z-index: 2;
`

const PosterShadow = styled.img`
  bottom: -25px;
  filter: blur(15px);
  left: 0;
  max-width: 100%;
  position: absolute;
  transform: scale(0.9);
  z-index: 1;
`

const Poster = ({ src }: { src: string }) => {
  return (
    <Wrap>
      <PosterImage alt="Poster" src={src} />
      <PosterShadow alt="Poster shadow" src={src} />
    </Wrap>
  )
}

export default Poster
