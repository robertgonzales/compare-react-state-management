import { GraphQLClient } from "graphql-request"

const client = new GraphQLClient("http://localhost:8080/graphql/")

// NOTE: used by all apps except for apollo
export default function request(query, variables) {
  const rawQuery = query.loc.source.body
  return client.request(rawQuery, variables)
}
