import { useReducer } from 'react';

const initialState = {todos: [], message: ''};
const todosReducer = (state = initialState, action = {type: ''}) => {
  const {type, todo} = action
  switch(type) {
    case "todos/add":
      return {
        todos: [...state.todos, todo],
        message: 'Added'
      }
    case "todos/edit":
      let todos = state.todos;
      let idx = todos.findIndex(t => t.id === todo.id);
      todos.splice(idx, 1, todo);
      return {todos, message: 'Edited'}
    case "todos/remove":
      todos = state.todos;
      idx = todos.findIndex(t => t.id === todo.id);
      todos.splice(idx, 1);
      return {todos, message: 'Edited'}
    default:
      return state
  }
}

const useTodos = (initialValues = initialState) => {
  const [state, dispatch] = useReducer(todosReducer, initialValues, todosReducer)

  return {
    todos: state.todos,
    message: state.message,
    add: (todo) => dispatch({type: "todos/add", todo}),
    edit: (todo) => dispatch({type: "todos/edit", todo}),
    remove: (todo) => dispatch({type: "todos/remove", todo})
  }
}

export {todosReducer, useTodos}
