import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

function deconstructJWT (token) {
  const segments = token.split('.')

  if (!segments instanceof Array || segments.length !== 3) {
    throw new Error('Invalid JWT')
  }

  return JSON.parse(decodeURIComponent(escape(window.atob(segments[1]))))
}

const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL })

const middlewareLink = new ApolloLink((operation, forward) => {
  const unprotectedRoutes = ['login', 'register']

  if (unprotectedRoutes.includes(operation.operationName)) {
    return forward(operation)
  }

  const token = localStorage.getItem('token')

  // Redirect to login if no token
  if (!token) {
    window.location.href = '/'

    return forward(operation)
  }

  // Check if token has expired
  const tokenExpires = deconstructJWT(token).exp

  if (Date.now() - tokenExpires * 1000 > 0) {
    localStorage.removeItem('token')
    window.location.href = '/'

    return forward(operation)
  }

  // Set token on all requests
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}` || null,
    },
  })

  return forward(operation)
})

export const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: o => {
      const generalId = `${o.__typename}:${o.id}`

      // Fix cache behavior for multiple entries
      // of the same movie with different users
      // in the feed
      if (o.user) {
        return `${generalId}-${o.user.__typename}:${o.user.id}`
      }

      return generalId
    },
  }).restore(window.__APOLLO_STATE__),
})
