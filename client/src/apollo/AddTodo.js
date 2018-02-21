import { graphql } from "react-apollo"
import { TODOS_QUERY } from "../shared/queries"
import { ADD_TODO_MUTATION } from "../shared/mutations"
import { Input } from "../shared/components"

const AddTodo = graphql(ADD_TODO_MUTATION, {
  // map mutation to props
  props: ({ mutate }) => ({
    // onSubmit prop passes title
    onSubmit: title =>
      mutate({
        variables: { title },
        // creates new todo, so need to manually update cache
        update: (cache, response) => {
          // get todos data from cache
          const data = cache.readQuery({ query: TODOS_QUERY })
          // okay to mutate todos data
          data.todos.push(response.data.addTodo)
          // write updated todos data back to cache
          cache.writeQuery({ query: TODOS_QUERY, data })
        },
      }),
  }),
})(Input)

export default AddTodo
