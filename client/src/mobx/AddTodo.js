import { inject } from "mobx-react"
import { Input } from "../shared/components"

// map store to props
export default inject(stores => ({
  // onSubmit prop triggers addTodo
  onSubmit: text => stores.todoStore.addTodo(text),
}))(Input)
