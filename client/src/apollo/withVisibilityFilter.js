import { graphql } from "react-apollo"
import { VISIBILITY_FILTER_QUERY } from "./clientVisibility"

export default graphql(VISIBILITY_FILTER_QUERY, {
  props: ({ data }) => ({
    visibilityFilter: data.visibilityFilter,
  }),
})
