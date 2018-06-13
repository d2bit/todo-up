const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()

module.exports = {
  Query: {
    users: () =>
      firestore
        .collection('users')
        .orderBy('username', 'asc')
        .get()
        .then(snapshot => snapshot.docs)
        .then(docs =>
          docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
        ),
    user: (_, { id }) =>
      firestore
        .collection('users')
        .doc(id)
        .get()
        .then(doc => Object.assign({ id: doc.id }, doc.data())),
    todos: () =>
      firestore
        .collection('todos')
        .orderBy('createdAt', 'asc')
        .get()
        .then(snapshot => snapshot.docs)
        .then(docs =>
          docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
        ),
    todo: (_, { id }) =>
      firestore
        .collection('todos')
        .doc(id)
        .get()
        .then(doc => Object.assign({ id: doc.id }, doc.data())),
  },
  Mutation: {
    addUser: (_, { input }) =>
      firestore
        .collection('users')
        .add(Object.assign({ createdAt: new Date() }, input))
        .then(docRef => docRef.get())
        .then(doc => Object.assign({ id: doc.id }, doc.data())),
    addTodo: (_, { input }) =>
      firestore
        .collection('todos')
        .add(
          Object.assign(
            {
              done: false,
              createdAt: new Date(),
            },
            input
          )
        )
        .then(docRef => docRef.get())
        .then(doc => Object.assign({ id: doc.id }, doc.data())),
    toggleTodoDone: (_, { id }) => {
      const todoRef = firestore.collection('todos').doc(id)
      return firestore.runTransaction(transaction =>
        transaction.get(todoRef).then(todo => {
          const todoData = todo.data()
          const done = !todoData.done
          const updatedAt = new Date()
          transaction.update(todoRef, {
            done,
            updatedAt,
          })
          return Object.assign(todoData, { id, done, updatedAt })
        })
      )
    },
    markTodoDone: (_, { id }) =>
      firestore
        .collection('todos')
        .doc(id)
        .set(
          {
            done: true,
            updatedAt: new Date(),
          },
          { merge: true }
        )
        .then(() =>
          firestore
            .collection('todos')
            .doc(id)
            .get()
        )
        .then(doc => Object.assign({ id: doc.id }, doc.data())),
  },
  User: {
    todos: user =>
      firestore
        .collection('todos')
        .where('userId', '==', user.id)
        .get()
        .then(snapshot => snapshot.docs)
        .then(docs =>
          docs.map(doc => Object.assign({ id: doc.id }, doc.data()))
        ),
  },
  Todo: {
    user: todo =>
      firestore
        .collection('users')
        .doc(todo.userId)
        .get()
        .then(doc => Object.assign({ id: doc.id }, doc.data())),
  },
}
