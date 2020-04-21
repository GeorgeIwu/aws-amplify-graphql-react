import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import Auth from './auth';
import Task from './task';

const history = createBrowserHistory();

function Main() {
  return (
    <Router history={history}>
      <div>
        <Route path="/" component={Auth} />
        <Route path="/task" component={Task} />
      </div>
    </Router>
  )
}

export default Main
