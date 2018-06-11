const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express')
const { graphiqlExpress } = require('apollo-server-express')

const { fixPath } = require('./utils')

const app = express()

app.get('/', graphiqlExpress({ endpointURL: '/graphql' }))

module.exports = fixPath(app)
