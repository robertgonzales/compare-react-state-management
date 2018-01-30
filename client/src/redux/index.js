import React from "react"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { rootReducer } from "./reducers"
import thunk from "redux-thunk"
import TodoApp from "./TodoApp"

const todoStore = createStore(rootReducer, applyMiddleware(thunk))

const ReduxTodoApp = props => {
  return (
    <Provider store={todoStore}>
      <TodoApp />
    </Provider>
  )
}

export default ReduxTodoApp
