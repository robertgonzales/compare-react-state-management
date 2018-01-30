import { inject } from "mobx-react"
import { Input } from "../shared/components"

export default inject(stores => ({
  onSubmit: text => stores.todoStore.addTodo(text),
}))(Input)
