import { connect } from "react-redux"
import { Input } from "../shared/components"
import { addTodo } from "./actions"

const AddTodo = connect(
  state => ({}),
  dispatch => ({
    onSubmit: title => dispatch(addTodo(title)),
  })
)(Input)

export default AddTodo
