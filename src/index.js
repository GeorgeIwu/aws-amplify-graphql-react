import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-common'

import './index.css';
import Router from './Router';
import {StoreProvider as Store} from './_lib/hooks/useStore';
import getApolloClient from './_lib/utils/apolloClient';

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     createAuthLink(config),
//     createSubscriptionHandshakeLink(config)
//   ]),
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'cache-and-network'
//     }
//   }
// })

export default function App() {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getApolloClient().then((client) => {
      setClient(client)
      setLoading(false)
    })
  }, [])

  return loading ? null : <ApolloProvider client={client}><Store><Router /></Store></ApolloProvider>
}

ReactDOM.render(<App />, document.getElementById('root'))
