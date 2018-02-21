import React from "react"
import { Input } from "../shared/components"
import { TodosContext } from "./TodosStore"

const AddTodo = () => (
  <TodosContext.Consumer>
    {({ addTodo }) => <Input onSubmit={title => addTodo(title)} />}
  </TodosContext.Consumer>
)

export default AddTodo
