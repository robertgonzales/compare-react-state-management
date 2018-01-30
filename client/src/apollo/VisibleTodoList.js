import React from "react"
import { compose } from "react-apollo"
import { TodoList } from "../shared/components"
import { getVisibleTodos } from "../shared/selectors"
import withVisibilityFilter from "./withVisibilityFilter"
import withToggleTodo from "./withToggleTodo"
import withClearTodo from "./withClearTodo"
import withTodos from "./withTodos"

export default compose(
  withVisibilityFilter,
  withTodos,
  withToggleTodo,
  withClearTodo
)(props => (
  <TodoList
    todos={getVisibleTodos(props.todos, props.visibilityFilter)}
    onToggleTodo={id => props.toggleTodo(id)}
    onClearTodo={id => props.clearTodo(id)}
  />
))
