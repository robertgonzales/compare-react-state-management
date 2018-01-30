import React, { Component } from "react"
import { connect } from "react-redux"
import { loadTodos } from "./actions"
import VisibleTodoList from "./VisibleTodoList"
import AddTodo from "./AddTodo"
import FilterLink from "./FilterLink"

class TodoApp extends Component {
  componentDidMount() {
    this.props.loadTodos()
  }

  render() {
    if (this.props.error) {
      return "An unexpected error occurred"
    }

    if (this.props.loading) {
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
}

export default connect(
  state => ({
    error: state.todos.error,
    loading: state.todos.loading,
  }),
  dispatch => ({
    loadTodos: () => dispatch(loadTodos()),
  })
)(TodoApp)
