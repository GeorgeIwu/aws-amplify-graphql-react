import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import Auth from './auth';
import Chat from './chat';

const history = createBrowserHistory();

const Router = () => {
  return (
    <HashRouter history={history}>
      <div>
        <Route path="/" component={Auth} />
        <Route path="/chat" component={Chat} />
      </div>
    </HashRouter>
  )
}

export default Router
