import { useReducer } from 'react';
import { Auth } from 'aws-amplify';

import createChat from '../utils/createChat';

const authActions = dispatch => {
  const signup = async ({password, ...attributes}) => {
    const username = attributes.email || attributes.phone_number
    dispatch({type: "auth/loading", data: true})

    await Auth.signUp({username, password, attributes})
    dispatch({type: "auth/update", data: 'registered'})
  }

  const verify = async ({code, ...attributes}) => {
    const username = attributes.email || attributes.phone_number
    dispatch({type: "auth/loading", data: true})

    await Auth.confirmSignUp(username, code)
    dispatch({type: "auth/update", data: 'verified'})
    createChat(username)
  }

  const login = async ({password, ...attributes}) => {
    const username = attributes.email || attributes.phone_number
    dispatch({type: "auth/loading", data: true})

    const data = await Auth.signIn(username, password)
    dispatch({type: "auth/update", data})
  }

  return {signup, verify, login}
}

const initialState = {error: null, data: null, loading: null};
const authReducer = (state = initialState, action = {type: undefined, data: null}) => {
  switch (action.type) {
    case "auth/loading":
      return {...state, loading: action.data}
    case "auth/update":
      return {...state, data: action.data, loading: false}
    default:
      return state;
  }
}

const useAuth = (initialValues = initialState) => {
  const [state, dispatch] = useReducer(authReducer, initialValues, authReducer)

  return {
    ...state,
    ...authActions(dispatch)
  }
}

export {authActions, authReducer, useAuth}
