import { inject } from "mobx-react"
import { TodoList } from "../shared/components"

// map store to props
export default inject(stores => ({
  // todos prop pulls from computed store value
  todos: stores.todoStore.visibleTodos,
  // onClearTodo prop triggers clearTodo action
  onClearTodo: id => stores.todoStore.clearTodo(id),
  // onToggleTodo prop triggers toggleTodo action
  onToggleTodo: id => stores.todoStore.toggleTodo(id),
}))(TodoList)
