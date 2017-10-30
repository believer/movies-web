// @flow

import React from 'react'
import humanizeDuration from 'humanize-duration'

type Props = {
  runtime: number
}

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

  return <div>{shortEn(runtime * 60 * 1000, { delimiter: ' ' })}</div>
}

export default Duration
