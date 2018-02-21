import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "../shared/components"
import { setVisibilityFilter } from "./actions"

const FilterLink = connect(
  // map state to props
  (state, ownProps) => ({
    // active prop is true if active filter matches passed filter prop
    active: state.visibilityFilter === ownProps.filter,
  }),
  // map dispatch to props
  (dispatch, ownProps) => ({
    // onClick triggers setVisibilityFilter action, uses passed filter prop
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
  })
)(Link)

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
}

export default FilterLink
