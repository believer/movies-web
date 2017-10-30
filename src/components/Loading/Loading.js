import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  align-items: center;
  display: flex;
  font-size: 30px;
  height: 100vh;
  justify-content: center;
  margin: 0;
`

const Spinner = styled.div`
  height: 60px;
  position: relative;
  width: 60px;
`

const BounceOne = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #999;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`

const BounceTwo = BounceOne.extend`
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
`

const Loading = () => {
  return (
    <Wrap>
      <Spinner>
        <BounceOne />
        <BounceTwo />
      </Spinner>
    </Wrap>
  )
}

export default Loading
