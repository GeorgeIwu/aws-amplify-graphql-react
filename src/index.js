import React from 'react';
import ReactDOM from 'react-dom';

import Amplify from 'aws-amplify'
import Auth from '@aws-amplify/auth';
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'

import './index.css';
import App from './App';
import {StoreProvider} from './_lib/hooks/useStore';
import config from './aws-exports'

Amplify.configure(config)
const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: config.aws_appsync_authenticationType,
    // apiKey: config.aws_appsync_apiKey,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  }
});

// window.LOG_LEVEL = "DEBUG"
const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <StoreProvider><App /></StoreProvider>
    </Rehydrated>
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, document.getElementById('root'))
