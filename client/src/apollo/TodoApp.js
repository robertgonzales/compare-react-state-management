import React from "react"
import AddTodo from "./AddTodo"
import FilterLink from "./FilterLink"
import VisibleTodoList from "./VisibleTodoList"
import withTodos from "./withTodos"

export default withTodos(props => {
  if (props.error) {
    return "An unexpected error occurred"
  }

  if (props.loading) {
    return "Loading..."
  }

  return (
    <React.Fragment>
      <VisibleTodoList />
      <AddTodo />
      <footer>
        {"Show "}
        <FilterLink filter="SHOW_ALL">All</FilterLink>
        {", "}
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
        {", "}
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
      </footer>
    </React.Fragment>
  )
})
