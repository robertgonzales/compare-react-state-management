import "./index.css"
import React from "react"
import ReactDOM from "react-dom"
import ApolloTodoApp from "./apollo"
// import MobxTodoApp from "./mobx"
// import ReduxTodoApp from "./redux"
// import ContextTodoApp from "./context"

// NOTE: TodoApps are interchangeable
ReactDOM.render(<ApolloTodoApp />, document.getElementById("root"))
