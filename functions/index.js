const functions = require('firebase-functions')

const graphqlServer = require('./graphqlServer')
const graphqlDocumentation = require('./graphqlDocumentation')

exports.graphql = functions.https.onRequest(graphqlServer)
exports.docs = functions.https.onRequest(graphqlDocumentation)
