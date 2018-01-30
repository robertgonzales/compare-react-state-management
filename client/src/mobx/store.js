import { observable, action, useStrict } from "mobx"
import request from "../shared/request"
import { getVisibleTodos } from "../shared/selectors"
import { TODOS_QUERY } from "../shared/queries"
import {
  ADD_TODO_MUTATION,
  TOGGLE_TODO_MUTATION,
  CLEAR_TODO_MUTATION,
} from "../shared/mutations"

useStrict(true)

const todoStore = observable({
  todos: observable.map(),
  errors: null,
  loading: false,
  visibilityFilter: "SHOW_ALL",

  get visibleTodos() {
    return getVisibleTodos(this.todos.values(), this.visibilityFilter)
  },

  loadTodos: action.bound(function() {
    this.todos.clear()
    this.error = null
    this.loading = true
    request(TODOS_QUERY)
      .then(
        action(response => {
          response.todos.forEach(todo => {
            this.todos.set(todo.id, todo)
          })
        })
      )
      .catch(
        action(error => {
          this.error = error
        })
      )
      .then(
        action(() => {
          this.loading = false
        })
      )
  }),

  addTodo: action.bound(function(title) {
    request(ADD_TODO_MUTATION, { title }).then(
      action(response => {
        this.todos.set(response.addTodo.id, response.addTodo)
      })
    )
  }),

  toggleTodo: action.bound(function(id) {
    request(TOGGLE_TODO_MUTATION, { id }).then(
      action(response => {
        const todo = this.todos.get(id)
        this.todos.set(id, { ...todo, ...response.toggleTodo })
      })
    )
  }),

  clearTodo: action.bound(function(id) {
    request(CLEAR_TODO_MUTATION, { id }).then(
      action(() => {
        this.todos.delete(id)
      })
    )
  }),

  setVisibilityFilter: action.bound(function(filter) {
    this.visibilityFilter = filter
  }),
})

export default todoStore
