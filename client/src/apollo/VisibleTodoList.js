import { compose, graphql } from "react-apollo"
import { TODOS_QUERY } from "../shared/queries"
import { CLEAR_TODO_MUTATION } from "../shared/mutations"
import { TOGGLE_TODO_MUTATION } from "../shared/mutations"
import { VISIBILITY_FILTER_QUERY } from "./clientVisibility"
import { getVisibleTodos } from "../shared/selectors"
import { TodoList } from "../shared/components"

const VisibleTodoList = compose(
  graphql(VISIBILITY_FILTER_QUERY, {
    // map filter query to props
    props: ({ data }) => ({
      visibilityFilter: data.visibilityFilter,
    }),
  }),
  graphql(TODOS_QUERY, {
    // map todos query to props
    props: ({ data, ownProps }) => ({
      // use visibilityFilter prop from above to get visible todos
      todos: getVisibleTodos(data.todos, ownProps.visibilityFilter),
    }),
  }),
  graphql(TOGGLE_TODO_MUTATION, {
    // map toggle todo mutation to props
    props: ({ mutate }) => ({
      // onToggleTodo prop passes id
      onToggleTodo: id => mutate({ variables: { id } }),
      // NOTE: no need to configure update, since we're mutating an
      // existing todo. apollo will automatically merge response todo.
    }),
  }),
  graphql(CLEAR_TODO_MUTATION, {
    // map clear todo mutation to props
    props: ({ mutate }) => ({
      // onClearTodo prop passes id
      onClearTodo: id =>
        mutate({
          variables: { id },
          // deletes todo, so need to manually update cache
          update: (cache, response) => {
            // get todos data from cache
            const data = cache.readQuery({ query: TODOS_QUERY })
            // find and remove cleared todo
            const index = data.todos.findIndex(todo => todo.id === id)
            data.todos.splice(index, 1)
            // write updated todos data back to cache
            cache.writeQuery({ query: TODOS_QUERY, data })
          },
        }),
    }),
  })
)(TodoList)

export default VisibleTodoList
