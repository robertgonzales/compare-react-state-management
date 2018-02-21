import { connect } from "react-redux"
import { TodoList } from "../shared/components"
import { clearTodo, toggleTodo } from "./actions"
import { getVisibleTodos } from "../shared/selectors"

const VisibleTodoList = connect(
  // map state to props
  state => ({
    // todos prop computed from active filter state
    todos: getVisibleTodos(state.todos.items, state.visibilityFilter),
  }),
  // map dispatch to props
  dispatch => ({
    // onClearTodo prop triggers toggleTodo action
    onClearTodo: id => dispatch(clearTodo(id)),
    // onToggleTodo prop triggers toggleTodo action
    onToggleTodo: id => dispatch(toggleTodo(id)),
  })
)(TodoList)

export default VisibleTodoList
