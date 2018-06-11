const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()

module.exports = {
  Query: {
    users: () =>
      firestore
        .collection('users')
        .get()
        .then(snapshot => snapshot.docs)
        .then(docs =>
          docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
        ),
    user: (_, { input }) =>
      firestore
        .collection('users')
        .doc(input.id)
        .get()
        .then(doc => Object.assign({ id: doc.id }, doc.data())),
    todos: () =>
      firestore
        .collection('todos')
        .get()
        .then(snapshot => snapshot.docs)
        .then(docs =>
          docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
        ),
    todo: (_, { input }) =>
      firestore
        .collection('todos')
        .doc(input.id)
        .get()
        .then(doc => Object.assign({ id: doc.id }, doc.data())),
  },
  Mutation: {
    addUser: (_, { input }) =>
      firestore
        .collection('users')
        .add(input)
        .then(doc => Object.assign({ id: doc.id }, input)),
    addTodo: (_, { input }) =>
      firestore
        .collection('todos')
        .add(input)
        .then(doc => Object.assign({ id: doc.id }, input)),
    markTodoDone: (_, { input }) =>
      firestore
        .collection('todos')
        .add(input)
        .then(doc => Object.assign({ id: doc.id }, input)),
  },
}
