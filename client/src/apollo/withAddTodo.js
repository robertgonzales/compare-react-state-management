import { graphql } from "react-apollo"
import { TODOS_QUERY } from "../shared/queries"
import { ADD_TODO_MUTATION } from "../shared/mutations"

export default graphql(ADD_TODO_MUTATION, {
  props: ({ mutate }) => ({
    addTodo: title =>
      mutate({
        variables: { title },
        update: (cache, response) => {
          const data = cache.readQuery({ query: TODOS_QUERY })
          data.todos.push(response.data.addTodo)
          cache.writeQuery({ query: TODOS_QUERY, data })
        },
      }),
  }),
})
