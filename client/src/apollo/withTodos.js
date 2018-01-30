import { graphql } from "react-apollo"
import { TODOS_QUERY } from "../shared/queries"

export default graphql(TODOS_QUERY, {
  props: ({ data, ownProps }) => ({
    error: data.error,
    loading: data.loading,
    todos: data.todos,
  }),
})
