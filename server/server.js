var express = require("express")
var Schema = require("./schema")
var graphQLHTTP = require("express-graphql")

var app = express()

app.use("/graphql", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  )
  if (req.method === "OPTIONS") {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(
  "/graphql",
  graphQLHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true,
  })
)

app.listen(process.env.PORT || 8080, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log(
    `GraphQL Server is now running on localhost:${process.env.PORT || 8080}`
  )
})
