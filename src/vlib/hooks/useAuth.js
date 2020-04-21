import { useReducer } from 'react';
import { Auth } from 'aws-amplify';

const sideEffect = async (dispatcher, state, {type, data = {}}) => {
  let res
  const {password, code, ...attributes} = data
  const username = attributes.email || attributes.phone_number

  try {
    switch (type) {
      case "auth/signup":
        res = await Auth.signUp({username, password, attributes})
        dispatcher({type: "auth/update", data: {...state, user: 'ok'}})
        return
      case "auth/verify":
        res = await Auth.confirmSignUp(username, code)
        dispatcher({type: "auth/update", data: {...state, user: 'ok'}})
        return
      case "auth/login":
        res = await Auth.signIn(username, password)
        dispatcher({type: "auth/update", data: {...state, user: res.attributes}})
        return
      default:
        return;
    }
  } catch (error) {
    console.log({error})
    dispatcher({type: "auth/update", data: {...state, error}})
  }
};


const initialState = {error: null, user: null, isLoading: null};
const authReducer = (state = initialState, action = {type: undefined}) => {
  const {dispatch: dispatcher} = action
  switch (action.type) {
    case "auth/signup":
      sideEffect(dispatcher, state, action)
      return {...state, isLoading: true}
    case "auth/verify":
      sideEffect(dispatcher, state, action)
      return {...state, isLoading: true}
    case "auth/login":
      sideEffect(dispatcher, state, action)
      return {...state, isLoading: true}
    case "auth/update":
      // const user = await Auth.currentAuthenticatedUser()
      return {...action.data, isLoading: false}
    default:
      return state;
  }
}

const useAuth = (initialValues = initialState) => {
  const [state, dispatch] = useReducer(authReducer, initialValues, authReducer)

  return {
    error: state.error,
    user: state.user,
    isLoading: state.isLoading,
    signup: (data) => dispatch({type: "auth/signup", data, dispatch}),
    login: (data) => dispatch({type: "auth/login", data, dispatch}),
    reset: (data) => dispatch({type: "auth/update", data, dispatch}),
  }
}

export {authReducer, useAuth}
