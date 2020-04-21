import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStore } from '../../Store';

const PublicRoute = ({ component: Component, ...rest }) => {
  const {data} = useStore().auth
  const isRegistered = data && data === 'registered' && rest.path !== '/verify'
  const isVerified = data && data === 'verfied' && rest.path !== '/login'
  const isAuthed = data && data.email

  return (
    <Route
      {...rest}
      render={props =>
        isRegistered ? <Redirect to={{ pathname: `/verify`, state: { from: props.location } }}/>
          : isVerified ? <Redirect to={{ pathname: `/login`, state: { from: props.location } }}/>
          : isAuthed ? <Redirect to={{ pathname: (props.state && props.state.from) || `/task`, state: { from: props.location } }}/>
          : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;


