import gql from "graphql-tag"

// client state query

export const VISIBILITY_FILTER_QUERY = gql`
  query {
    visibilityFilter @client
  }
`

// client state mutation

export const VISIBILITY_FILTER_MUTATION = gql`
  mutation($filter: String!) {
    setVisibilityFilter(filter: $filter) @client
  }
`

// client state link

export default {
  defaults: {
    visibilityFilter: "SHOW_ALL",
  },
  resolvers: {
    Query: {
      visibilityFilter(obj, args, { cache }) {
        const data = cache.readQuery({ query: VISIBILITY_FILTER_QUERY })
        return data.visibilityFilter
      },
    },
    Mutation: {
      setVisibilityFilter(obj, { filter }, { cache }) {
        const data = { visibilityFilter: filter }
        cache.writeQuery({ query: VISIBILITY_FILTER_QUERY, data })
        return null
      },
    },
  },
}
