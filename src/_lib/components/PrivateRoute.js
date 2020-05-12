import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useStore} from '../hooks'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {data} = useStore().auth
  const isAuthed = !!(data && data.attributes)

  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? <Component {...props} />
          : <Redirect to={{ pathname: `/`, state: { from: props.location } }}/>
      }
    />
  );
};

export default PrivateRoute;


