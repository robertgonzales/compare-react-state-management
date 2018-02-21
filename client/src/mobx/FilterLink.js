import { inject } from "mobx-react"
import { Link } from "../shared/components"

// map store to props
export default inject((stores, ownProps) => ({
  // active prop is true if active filter matches passed filter prop
  active: stores.todoStore.visibilityFilter === ownProps.filter,
  // onClick prop triggers setVisibilityFilter action
  onClick: () => stores.todoStore.setVisibilityFilter(ownProps.filter),
}))(Link)
