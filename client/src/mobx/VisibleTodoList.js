import { inject } from "mobx-react"
import { TodoList } from "../shared/components"

export default inject(stores => ({
  todos: stores.todoStore.visibleTodos,
  onClearTodo: id => stores.todoStore.clearTodo(id),
  onToggleTodo: id => stores.todoStore.toggleTodo(id),
}))(TodoList)
