import React from "react"
import PropTypes from "prop-types"

const Input = props => (
  <input
    type="text"
    onKeyUp={e => {
      if (
        e.keyCode === 13 && // key up is enter key
        e.target.value.trim() // value is more than empty string
      ) {
        props.onSubmit(e.target.value)
        e.target.value = "" // clear input
      }
    }}
  />
)

Input.displayName = "Input"

Input.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Input
