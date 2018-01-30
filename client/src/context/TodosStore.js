import React from "react"
import createReactContext from "create-react-context"
import request from "../shared/request"
import { TODOS_QUERY } from "../shared/queries"
import {
  ADD_TODO_MUTATION,
  TOGGLE_TODO_MUTATION,
  CLEAR_TODO_MUTATION,
} from "../shared/mutations"

const defaultState = {
  error: null,
  loading: false,
  todos: [],
}

export const TodosContext = createReactContext(defaultState)

export default class TodosStore extends React.Component {
  state = defaultState

  componentDidMount() {
    this.loadTodos()
  }

  loadTodos = () => {
    this.setState({ error: null, loading: true })
    request(TODOS_QUERY)
      .then(response => {
        this.setState({ todos: response.todos })
      })
      .catch(error => {
        this.setState({ error })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  toggleTodo = id => {
    request(TOGGLE_TODO_MUTATION, { id }).then(response => {
      this.setState(state => ({
        todos: state.todos.map(todo => {
          if (todo.id === id) {
            return { ...todo, ...response.toggleTodo }
          }
          return todo
        }),
      }))
    })
  }

  clearTodo = id => {
    request(CLEAR_TODO_MUTATION, { id }).then(response => {
      this.setState(state => ({
        todos: state.todos.filter(todo => todo.id !== id),
      }))
    })
  }

  addTodo = title => {
    request(ADD_TODO_MUTATION, { title }).then(response => {
      this.setState(state => ({
        todos: state.todos.concat(response.addTodo),
      }))
    })
  }

  render() {
    return (
      <TodosContext.Provider
        value={{
          error: this.state.error,
          loading: this.state.loading,
          todos: this.state.todos,
          loadTodos: this.loadTodos,
          toggleTodo: this.toggleTodo,
          clearTodo: this.clearTodo,
          addTodo: this.addTodo,
        }}>
        {this.props.children}
      </TodosContext.Provider>
    )
  }
}
