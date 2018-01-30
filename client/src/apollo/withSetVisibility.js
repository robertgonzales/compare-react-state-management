import { graphql } from "react-apollo"
import { VISIBILITY_FILTER_MUTATION } from "./clientVisibility"

export default graphql(VISIBILITY_FILTER_MUTATION, {
  props: ({ mutate }) => ({
    setVisibility: filter => mutate({ variables: { filter } }),
  }),
})
