import request from "../shared/request"
import {
  ADD_TODO_MUTATION,
  TOGGLE_TODO_MUTATION,
  CLEAR_TODO_MUTATION,
} from "../shared/mutations"
import { TODOS_QUERY } from "../shared/queries"

export const requestTodos = () => {
  return { type: "REQUEST_TODOS" }
}

export const receiveTodos = items => {
  return { type: "RECEIVE_TODOS", items }
}

export const invalidateTodos = error => {
  return { type: "INVALIDATE_TODOS", error }
}

export const receiveAddTodo = todo => {
  return { type: "RECEIVE_ADD_TODO", todo }
}

export const receiveToggleTodo = todo => {
  return { type: "RECEIVE_TOGGLE_TODO", todo }
}

export const receiveClearTodo = id => {
  return { type: "RECEIVE_CLEAR_TODO", id }
}

export const setVisibilityFilter = filter => {
  return { type: "SET_VISIBILITY_FILTER", filter }
}

export const loadTodos = () => dispatch => {
  dispatch(requestTodos())
  request(TODOS_QUERY)
    .then(response => {
      dispatch(receiveTodos(response.todos))
    })
    .catch(error => {
      dispatch(invalidateTodos(error))
    })
}

export const addTodo = title => dispatch => {
  request(ADD_TODO_MUTATION, { title }).then(response => {
    dispatch(receiveAddTodo(response.addTodo))
  })
}

export const toggleTodo = id => dispatch => {
  request(TOGGLE_TODO_MUTATION, { id }).then(response => {
    dispatch(receiveToggleTodo(response.toggleTodo))
  })
}

export const clearTodo = id => dispatch => {
  request(CLEAR_TODO_MUTATION, { id }).then(response => {
    dispatch(receiveClearTodo(id))
  })
}
