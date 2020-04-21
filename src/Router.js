import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import Auth from './auth';
import Task from './task';

const history = createBrowserHistory();

const Router = () => {
  return (
    <HashRouter history={history}>
      <div>
        <Route path="/" component={Auth} />
        <Route path="/task" component={Task} />
      </div>
    </HashRouter>
  )
}

export default Router
