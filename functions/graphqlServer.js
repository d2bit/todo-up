const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const cors = require('cors')

const typeDefs = require('./schema.graphql')
const resolvers = require('./resolvers')
const { fixPath } = require('./utils')

const app = express()

const schema = makeExecutableSchema({ typeDefs, resolvers })
app.use(cors(), bodyParser.json(), graphqlExpress({ schema }))

module.exports = fixPath(app)
