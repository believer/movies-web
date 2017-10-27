// @flow

type Type = 'backdrop' | 'logo' | 'poster' | 'profile' | 'still'

type Size =
  | 45
  | 92
  | 154
  | 185
  | 300
  | 342
  | 500
  | 632
  | 780
  | 1280
  | 'original'

const tmdbConf = {
  base_url: 'http://image.tmdb.org/t/p/',
  secure_base_url: 'https://image.tmdb.org/t/p/',
  backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
  logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  profile_sizes: ['w45', 'w185', 'h632', 'original'],
  still_sizes: ['w92', 'w185', 'w300', 'original'],
}

const findType = (type: Type): string[] => {
  switch (type) {
    case 'backdrop':
      return tmdbConf.backdrop_sizes
    case 'logo':
      return tmdbConf.logo_sizes
    case 'poster':
      return tmdbConf.poster_sizes
    case 'profile':
      return tmdbConf.profile_sizes
    case 'still':
      return tmdbConf.still_sizes
    default:
      return []
  }
}

const getSize = (type: Type, size: Size): string => {
  const found = findType(type).find(tmdbSize => {
    return tmdbSize === `w${size}` || tmdbSize === size
  })

  return found || ''
}

const tmdbLink = (src: string, size: Size, type: Type): string => {
  const matchedType = getSize(type, size)

  return `${tmdbConf.base_url}${matchedType}${src}`
}

export default tmdbLink
