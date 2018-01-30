import React from "react"
import { Input } from "../shared/components"
import { TodosContext } from "./TodosStore"

const AddTodo = props => (
  <TodosContext.Consumer>
    {({ addTodo }) => <Input {...props} onSubmit={title => addTodo(title)} />}
  </TodosContext.Consumer>
)

export default AddTodo
