import React from "react"
import PropTypes from "prop-types"

const Todo = props => (
  <div>
    <input
      type="checkbox"
      checked={props.completed}
      onChange={() => props.onToggle(props.id)}
    />
    <label>{props.text}</label>
    <button onClick={() => props.onClear(props.id)}>x</button>
  </div>
)

Todo.displayName = "Todo"

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
}

export default Todo
