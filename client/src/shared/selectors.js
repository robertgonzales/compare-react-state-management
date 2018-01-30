export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ACTIVE":
      return todos.filter(todo => !todo.completed)
    case "SHOW_COMPLETED":
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
}
