import { combineReducers } from "redux"

export const todos = (
  state = {
    items: [],
    error: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_TODOS":
      return {
        ...state,
        error: null,
        loading: true,
      }
    case "RECEIVE_TODOS":
      return {
        ...state,
        loading: false,
        items: action.items,
      }
    case "INVALIDATE_TODOS":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case "RECEIVE_ADD_TODO":
      return {
        ...state,
        items: state.items.concat(action.todo),
      }
    case "RECEIVE_TOGGLE_TODO":
      return {
        ...state,
        items: state.items.map(todo => {
          if (todo.id === action.todo.id) {
            return { ...todo, ...action.todo }
          }
          return todo
        }),
      }
    case "RECEIVE_CLEAR_TODO":
      return {
        ...state,
        items: state.items.filter(todo => todo.id !== action.id),
      }
    default:
      return state
  }
}

export const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter
    default:
      return state
  }
}

export const rootReducer = combineReducers({ todos, visibilityFilter })
