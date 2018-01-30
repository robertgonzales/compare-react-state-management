import { inject } from "mobx-react"
import { Link } from "../shared/components"

export default inject((stores, ownProps) => ({
  active: stores.todoStore.visibilityFilter === ownProps.filter,
  onClick: () => stores.todoStore.setVisibilityFilter(ownProps.filter),
}))(Link)
