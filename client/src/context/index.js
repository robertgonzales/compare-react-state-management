import React from "react"
import VisibilityStore from "./VisibilityStore"
import TodosStore from "./TodosStore"
import TodoApp from "./TodoApp"

const ContextTodoApp = props => {
  return (
    <VisibilityStore>
      <TodosStore>
        <TodoApp />
      </TodosStore>
    </VisibilityStore>
  )
}

export default ContextTodoApp
