
const combineReducers = (reducerDict) => {
  const _initialState = getInitialState(reducerDict);
  return function(state = _initialState, action) {
    return Object.keys(reducerDict).reduce((acc, curr) => {
      let slice = reducerDict[curr](state[curr], action);
      return { ...acc, [curr]: slice };
    }, state);
  };
}

// function combineReducers(reducers) {
//   return (state = {}, action) => {
//     const newState = {};
//     for (let key in reducers) {
//       newState[key] = reducers[key](state[key], action);
//     }
//     return newState;
//   }
// }

const getInitialState = (reducerDict) => {
  return Object.keys(reducerDict).reduce((acc, curr) => {
    const slice = reducerDict[curr](undefined, { type: undefined });
    return { ...acc, [curr]: slice };
  }, {});
}

const withCallBack = async (action, callback) => {
  const res = await action()
  callback(res)
  return
}


export {combineReducers, withCallBack}
