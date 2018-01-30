import React from "react"
import { Provider } from "mobx-react"
import todoStore from "./store"
import TodoApp from "./TodoApp"

const MobxTodoApp = () => {
  return (
    <Provider todoStore={todoStore}>
      <TodoApp />
    </Provider>
  )
}

export default MobxTodoApp
