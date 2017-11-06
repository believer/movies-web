export const deconstructJWT = token => {
  const segments = token.split('.')

  if (!segments instanceof Array || segments.length !== 3) {
    throw new Error('Invalid JWT')
  }

  return JSON.parse(decodeURIComponent(escape(window.atob(segments[1]))))
}
