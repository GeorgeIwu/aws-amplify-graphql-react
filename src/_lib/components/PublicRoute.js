import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useStore} from '../hooks'

const PublicRoute = ({ component: Component, ...rest }) => {
  const {data} = useStore().auth
  const isRegistered = data && data === 'registered' && rest.path !== '/verify'
  const isVerified = data && data === 'verified' && rest.path !== '/login'
  const isAuthed = !!(data && data.attributes)

  return (
    <Route
      {...rest}
      render={props =>
        isRegistered ? <Redirect to={{ pathname: `/verify`, state: { from: props.location } }}/>
          : isVerified ? <Redirect to={{ pathname: `/login`, state: { from: props.location } }}/>
          : isAuthed ? <Redirect to={{ pathname: (props.state && props.state.from) || `/chat`, state: { from: props.location } }}/>
          : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;


