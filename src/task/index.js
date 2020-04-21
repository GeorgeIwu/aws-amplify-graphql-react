import React from 'react';
import {PrivateRoute} from '../_lib/components'
import Tasks from './Tasks'
import TaskNew from './TaskNew'

const Task = () => (
  <div>
    <PrivateRoute exact path="/task" component={Tasks} />
    <PrivateRoute exact path="/task/new" component={TaskNew} />
  </div>
);

export default Task;
