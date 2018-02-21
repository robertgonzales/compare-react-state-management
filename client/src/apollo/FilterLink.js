import PropTypes from "prop-types"
import { compose, graphql } from "react-apollo"
import { VISIBILITY_FILTER_QUERY } from "./clientVisibility"
import { VISIBILITY_FILTER_MUTATION } from "./clientVisibility"
import { Link } from "../shared/components"

const FilterLink = compose(
  graphql(VISIBILITY_FILTER_QUERY, {
    // map query to props
    props: ({ data, ownProps }) => ({
      // active prop is true if filter query matches passed filter prop
      active: data.visibilityFilter === ownProps.filter,
    }),
  }),
  graphql(VISIBILITY_FILTER_MUTATION, {
    // map mutation to props
    props: ({ mutate, ownProps }) => ({
      // onClick prop triggers mutation, uses passed filter prop
      onClick: () => mutate({ variables: { filter: ownProps.filter } }),
    }),
  })
)(Link)

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
}

export default FilterLink
