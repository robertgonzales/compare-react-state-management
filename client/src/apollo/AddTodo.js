import React from "react"
import { Input } from "../shared/components"
import withAddTodo from "./withAddTodo"

export default withAddTodo(props => (
  <Input {...props} onSubmit={title => props.addTodo(title)} />
))
