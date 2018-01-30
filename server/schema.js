var mongoose = require("mongoose")
var Schema = mongoose.Schema
var graphql = require("graphql")
var GraphQLObjectType = graphql.GraphQLObjectType
var GraphQLBoolean = graphql.GraphQLBoolean
var GraphQLID = graphql.GraphQLID
var GraphQLString = graphql.GraphQLString
var GraphQLList = graphql.GraphQLList
var GraphQLNonNull = graphql.GraphQLNonNull
var GraphQLSchema = graphql.GraphQLSchema

// Mongoose Schema definition
var TODO = mongoose.model(
  "Todo",
  new Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    completed: Boolean,
  })
)

/*
 * I’m sharing my credentials here.
 * Feel free to use it while you’re learning.
 * After that, create and use your own credential.
 * Thanks.
 *
 * to connect to a local instance of MongoDB use
 * COMPOSE_URI=mongodb://example:example@127.0.0.1:27017/todo
 */
var COMPOSE_URI_DEFAULT =
  "mongodb://graphqltodosuser:graphqltodospassword@candidate.12.mongolayer.com:11219,candidate.60.mongolayer.com:10594/graphqltodos?replicaSet=set-569540e711469f811f0000a2"
mongoose.connect(process.env.COMPOSE_URI || COMPOSE_URI_DEFAULT, function(
  error
) {
  if (error) console.error(error)
  else console.log("mongo connected")
})
/** END */

var TodoType = new GraphQLObjectType({
  name: "todo",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "Todo id",
    },
    title: {
      type: GraphQLString,
      description: "Task title",
    },
    completed: {
      type: GraphQLBoolean,
      description: "Flag to mark if the task is completed",
    },
  }),
})

var promiseListAll = () => {
  return new Promise((resolve, reject) => {
    TODO.find((err, todos) => {
      if (err) reject(err)
      else resolve(todos)
    })
  })
}

var QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      resolve: () => {
        return promiseListAll()
      },
    },
  }),
})

var MutationAdd = {
  type: TodoType,
  description: "Add a Todo",
  args: {
    title: {
      name: "Todo title",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (root, args) => {
    var newTodo = new TODO({
      title: args.title,
      completed: false,
    })
    newTodo.id = newTodo._id
    return new Promise((resolve, reject) => {
      newTodo.save(function(err) {
        if (err) reject(err)
        else resolve(newTodo)
      })
    })
  },
}

var MutationToggle = {
  type: TodoType,
  description: "Toggle the todo",
  args: {
    id: {
      name: "Todo Id",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      TODO.findById(args.id, (err, todo) => {
        if (err) {
          reject(err)
          return
        }

        if (!todo) {
          reject("Todo NOT found")
          return
        } else {
          todo.completed = !todo.completed
          todo.save(err => {
            if (err) reject(err)
            else resolve(todo)
          })
        }
      })
    })
  },
}

var MutationRemove = {
  type: TodoType,
  description: "Remove the todo",
  args: {
    id: {
      name: "Todo Id",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      TODO.findById(args.id, (err, todo) => {
        if (err) {
          reject(err)
        } else if (!todo) {
          reject("Todo NOT found")
        } else {
          todo.remove(err => {
            if (err) reject(err)
            else resolve(todo)
          })
        }
      })
    })
  },
}

var MutationToggleAll = {
  type: new GraphQLList(TodoType),
  description: "Toggle all todos",
  args: {
    checked: {
      name: "Todo Id",
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      TODO.find((err, todos) => {
        if (err) {
          reject(err)
          return
        }
        TODO.update(
          {
            _id: {
              $in: todos.map(todo => todo._id),
            },
          },
          {
            completed: args.checked,
          },
          {
            multi: true,
          },
          err => {
            if (err) reject(err)
            else promiseListAll().then(resolve, reject)
          }
        )
      })
    })
  },
}

var MutationClearCompleted = {
  type: new GraphQLList(TodoType),
  description: "Clear completed",
  resolve: () => {
    return new Promise((resolve, reject) => {
      TODO.find({ completed: true }, (err, todos) => {
        if (err) {
          reject(err)
        } else {
          TODO.remove(
            {
              _id: {
                $in: todos.map(todo => todo._id),
              },
            },
            err => {
              if (err) reject(err)
              else resolve(todos)
            }
          )
        }
      })
    })
  },
}

var MutationSave = {
  type: TodoType,
  description: "Edit a todo",
  args: {
    id: {
      name: "Todo Id",
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      name: "Todo title",
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      TODO.findById(args.id, (err, todo) => {
        if (err) {
          reject(err)
          return
        }

        if (!todo) {
          reject("Todo NOT found")
          return
        }

        todo.title = args.title
        todo.save(err => {
          if (err) reject(err)
          else resolve(todo)
        })
      })
    })
  },
}

var MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: MutationAdd,
    toggleTodo: MutationToggle,
    toggleAll: MutationToggleAll,
    clearTodo: MutationRemove,
    clearCompleted: MutationClearCompleted,
    save: MutationSave,
  },
})

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})
