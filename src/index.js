import React from 'react';
import ReactDOM from 'react-dom';

import Amplify from 'aws-amplify'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'

import './index.css';
import Router from './Router';
import Store from './Store';
import config from './aws-exports'

Amplify.configure(config)

const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: config.aws_appsync_authenticationType,
    apiKey: config.aws_appsync_apiKey
  }
});

// window.LOG_LEVEL = "DEBUG"
const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated
      render={({ rehydrated }) => (
        rehydrated ? <Store><Router /></Store> : <p style={{ padding: 30, color: 'white' }}>Loading...</p>
      )}
    />
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById('root'))
