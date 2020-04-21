import React from 'react';
import {PublicRoute} from '../_lib/components'
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';
import Verify from './Verify';


const Auth = () => (
  <div>
    <PublicRoute exact path="/" component={Landing} />
    <PublicRoute exact path="/login" component={Login} />
    <PublicRoute exact path="/signup" component={Signup} />
    <PublicRoute exact path="/verify" component={Verify} />
  </div>
);

export default Auth;
