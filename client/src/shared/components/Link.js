import React from "react"
import PropTypes from "prop-types"

const FilterLink = props => {
  if (props.active) {
    return <span>{props.children}</span>
  }

  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault()
        props.onClick()
      }}>
      {props.children}
    </a>
  )
}

FilterLink.displayName = "FilterLink"

FilterLink.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default FilterLink
