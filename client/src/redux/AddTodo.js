import { connect } from "react-redux"
import { Input } from "../shared/components"
import { addTodo } from "./actions"

const AddTodo = connect(
  // map state to props
  state => ({}),
  // map dispatch to props
  dispatch => ({
    // onSubmit prop triggers addTodo action
    onSubmit: title => dispatch(addTodo(title)),
  })
)(Input)

export default AddTodo
