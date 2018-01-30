import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "../shared/components"
import { setVisibilityFilter } from "./actions"

const FilterLink = connect(
  (state, ownProps) => ({
    active: state.visibilityFilter === ownProps.filter,
  }),
  (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
  })
)(Link)

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
}

export default FilterLink
