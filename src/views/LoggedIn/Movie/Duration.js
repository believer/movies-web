// @flow

import React from 'react'
import humanizeDuration from 'humanize-duration'
import styled from 'styled-components'

type Props = {
  runtime: number
}

const Wrap = styled.div`margin-bottom: 20px;`

const Duration = ({ runtime }: Props) => {
  const shortEn = humanizeDuration.humanizer({
    language: 'shortEn',
    languages: {
      shortEn: {
        y: () => 'y',
        mo: () => 'mo',
        w: () => 'w',
        d: () => 'd',
        h: () => 'hr',
        m: () => 'min',
        s: () => 's',
        ms: () => 'ms',
      },
    },
  })

  return <Wrap>{shortEn(runtime * 60 * 1000, { delimiter: ' ' })}</Wrap>
}

export default Duration
