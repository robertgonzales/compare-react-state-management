import React from "react"
import { graphql } from "react-apollo"
import { TODOS_QUERY } from "../shared/queries"
import VisibleTodoList from "./VisibleTodoList"
import FilterLink from "./FilterLink"
import AddTodo from "./AddTodo"

const TodoApp = props => {
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
}

export default graphql(TODOS_QUERY, {
  // map query to props
  props: ({ data }) => ({
    // pass error and loading props
    error: data.error,
    loading: data.loading,
  }),
})(TodoApp)
