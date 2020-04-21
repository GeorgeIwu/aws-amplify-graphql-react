import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStore } from '../hooks';

const PublicRoute = ({ component: Component, ...rest }) => {
  const {auth} = useStore()
  const isLoading = auth.isLoading
  const isAuthed = auth.user && auth.user.sub

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthed
          ? isLoading ? <div>Loading</div> : <Component {...props} />
          : <Redirect to={{ pathname: `/task`, state: { from: props.location } }}/>
      }
    />
  );
};

export default PublicRoute;


