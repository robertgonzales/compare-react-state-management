import gql from "graphql-tag"

export const ADD_TODO_MUTATION = gql`
  mutation($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`

export const TOGGLE_TODO_MUTATION = gql`
  mutation($id: String!) {
    toggleTodo(id: $id) {
      id
      completed
    }
  }
`

export const CLEAR_TODO_MUTATION = gql`
  mutation($id: String!) {
    clearTodo(id: $id) {
      id
    }
  }
`
