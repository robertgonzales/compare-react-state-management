import { connect } from "react-redux"
import { TodoList } from "../shared/components"
import { clearTodo, toggleTodo } from "./actions"
import { getVisibleTodos } from "../shared/selectors"

const VisibleTodoList = connect(
  state => ({
    todos: getVisibleTodos(state.todos.items, state.visibilityFilter),
  }),
  dispatch => ({
    onClearTodo: id => dispatch(clearTodo(id)),
    onToggleTodo: id => dispatch(toggleTodo(id)),
  })
)(TodoList)

export default VisibleTodoList
