import React from "react"
import { compose } from "react-apollo"
import { Link } from "../shared/components"
import withVisibilityFilter from "./withVisibilityFilter"
import withSetVisibility from "./withSetVisibility"

export default compose(withVisibilityFilter, withSetVisibility)(props => (
  <Link
    {...props}
    active={props.visibilityFilter === props.filter}
    onClick={() => props.setVisibility(props.filter)}
  />
))
