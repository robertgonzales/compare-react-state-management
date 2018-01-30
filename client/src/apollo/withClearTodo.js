import { graphql } from "react-apollo"
import { TODOS_QUERY } from "../shared/queries"
import { CLEAR_TODO_MUTATION } from "../shared/mutations"

export default graphql(CLEAR_TODO_MUTATION, {
  props: ({ mutate }) => ({
    clearTodo: id =>
      mutate({
        variables: { id },
        update: (cache, response) => {
          const data = cache.readQuery({ query: TODOS_QUERY })
          const index = data.todos.findIndex(todo => todo.id === id)
          data.todos.splice(index, 1)
          cache.writeQuery({ query: TODOS_QUERY, data })
        },
      }),
  }),
})
