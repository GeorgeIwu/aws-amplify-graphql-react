// import {HttpLink} from 'apollo-link-http'
// import {setContext} from 'apollo-link-context'
import Cookies from 'js-cookie'
import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link'
import QueueLink from 'apollo-link-queue'
import {RetryLink} from 'apollo-link-retry'
import {onError} from 'apollo-link-error'
import SerializingLink from 'apollo-link-serialize'
import {CachePersistor} from 'apollo-cache-persist'
import {InMemoryCache} from 'apollo-cache-inmemory'

import Amplify, {Auth} from 'aws-amplify'
import { createAuthLink } from 'aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link'
import AppSyncConfig from '../../aws-exports'

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

Amplify.configure(AppSyncConfig)
const getApolloClient = async () => {
  // const httpLink = new HttpLink ({uri: 'http://localhost:3000/graphql'})
  // const authLink = setContext (({headers}) => {
  //   const token = Cookies.get ('token')

  //   return {
  //     headers: {
  //       ...headers,
  //       Authorization: token? `Bearer $ {token}`: ''
  //     }
  //   }
  // })
  const config = {
    url: AppSyncConfig.aws_appsync_graphqlEndpoint,
    region: AppSyncConfig.aws_appsync_region,
    auth: {
      type: AppSyncConfig.aws_appsync_authenticationType,
      // apiKey: config.aws_appsync_apiKey,
      jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
    }
  }

  const retryLink = new RetryLink ({attempts: {max: Infinity}})

  const errorLink = onError (({networkError}) => {
    if (networkError && networkError.statusCode === 401) {
      Cookies.remove ('token')
      window.location.replace ('/login')
    }
  })

  const queueLink = new QueueLink ()

  window.addEventListener ('offline', () => queueLink.close ())
  window.addEventListener ('online', () => queueLink.open ())

  const serializingLink = new SerializingLink ()

  const trackerLink = new ApolloLink ((operation, forward) => {
    if (forward === undefined) return null

    const context = operation.getContext ()
    const trackedQueries = JSON.parse (window.localStorage.getItem ('trackedQueries') || null) || []

    if (context.tracked !== undefined) {
      const {operationName, query, variables} = operation

      const newTrackedQuery = {
        query,
        context,
        variables,
        operationName,
      }

      window.localStorage.setItem ('trackedQueries', JSON.stringify ([...trackedQueries, newTrackedQuery]))
    }

    return forward(operation).map ((data) => {
      if (context.tracked !== undefined) {
        window.localStorage.setItem ('trackedQueries', JSON.stringify (trackedQueries))
      }

      return data
    })
  })

  const link = ApolloLink.from([
    trackerLink,
    queueLink,
    serializingLink,
    retryLink,
    errorLink,
    createAuthLink(config),
    createSubscriptionHandshakeLink(config)
  ])

  const cache = new InMemoryCache ()

  const persistor = new CachePersistor ({
    cache,
    storage: window.localStorage,
  })

  const currentVersion = window.localStorage.getItem (SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore ();
  } else {
    await persistor.purge ()
    window.localStorage.setItem (SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }

  const client = new ApolloClient ({
    link,
    cache,
  })

  return client
}

export default getApolloClient
