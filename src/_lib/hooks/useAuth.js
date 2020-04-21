import { useReducer } from 'react';
import { Auth } from 'aws-amplify';

import {sideEffect} from '../utils'


const initialState = {error: null, data: null, loading: null};

const authReducer = (state = initialState, action = {type: undefined}) => {

  const {type, data, isSideEffectDone, dispatch} = action
  const {password, code, ...attributes} = data || {}
  const username = attributes.email || attributes.phone_number
  const register = async () => Auth.signUp({username, password, attributes})
  const verfiy = async () => Auth.confirmSignUp(username, code)
  const login = async () => Auth.signIn(username, password)

  try {
    switch (type) {
      case "auth/signup":
        !isSideEffectDone && sideEffect(dispatch, type, register)
        return !isSideEffectDone ? {...state, loading: true} : {...state, loading: false, data: 'registered'}
      case "auth/verify":
        !isSideEffectDone && sideEffect(dispatch, type, verfiy)
        return !isSideEffectDone ? {...state, loading: true} : {...state, loading: false, data: 'verfied'}
      case "auth/login":
        !isSideEffectDone && sideEffect(dispatch, type, login)
        return !isSideEffectDone ? {...state, loading: true} : {...state, loading: false, data: data.attributes}
      default:
        return state;
    }
  } catch (error) {
    console.log({error})
    return {...state, loading: false, error}
  }
}

const useAuth = (initialValues = initialState) => {
  const [state, dispatch] = useReducer(authReducer, initialValues, authReducer)

  return {
    error: state.error,
    data: state.data,
    loading: state.loading,
    actions: {
      signup: (data) => dispatch({type: "auth/signup", data, dispatch}),
      login: (data) => dispatch({type: "auth/login", data, dispatch}),
      reset: (data) => dispatch({type: "auth/update", data, dispatch}),
    }
  }
}

export {authReducer, useAuth}
