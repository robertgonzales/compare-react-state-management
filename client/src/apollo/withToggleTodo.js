import { graphql } from "react-apollo"
import { TOGGLE_TODO_MUTATION } from "../shared/mutations"

export default graphql(TOGGLE_TODO_MUTATION, {
  props: ({ mutate }) => ({
    toggleTodo: id => mutate({ variables: { id } }),
  }),
})
