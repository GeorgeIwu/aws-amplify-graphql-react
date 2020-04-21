import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {combineReducers} from '../utils'
import {todosReducer, formReducer, authReducer} from '.'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  todos: todosReducer,
})
const localState = JSON.parse(localStorage.getItem('store'))
const initialState = localState || rootReducer(undefined, {type: undefined});

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(state));
  }, [state]);

  const props = {
    ...state,
    auth: {
      ...state.auth,
      signup: (data) => dispatch({type: "auth/signup", data, dispatch}),
      verify: (data) => dispatch({type: "auth/verify", data, dispatch}),
      login: (data) => dispatch({type: "auth/login", data, dispatch}),
      logout: (data) => dispatch({type: "auth/logout", data, dispatch}),
    },
  }

  return (
    <StoreContext.Provider value={props}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);
