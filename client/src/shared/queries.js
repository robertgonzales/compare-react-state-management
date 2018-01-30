import gql from "graphql-tag"

export const TODOS_QUERY = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`
