import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStore } from '../../Store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {data} = useStore().auth
  const isAuthed = data && data.email
  console.log('username private', data && data.email)

  console.log( isAuthed)
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


