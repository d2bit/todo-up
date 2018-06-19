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
        )
        .then(docs => docs.filter(doc => !doc.deleted)),
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
    updateTodo: (_, { input }) => {
      const updateAttributes = {}
      const todoRef = firestore.collection('todos').doc(input.id)
      return firestore.runTransaction(transaction =>
        transaction.get(todoRef).then(todo => {
          const todoData = todo.data()
          if (input.done !== undefined && !!input.done !== !!todoData.done) {
            updateAttributes.done = !!input.done
            if (!todoData.done && !todoData.doneAt) {
              updateAttributes.doneAt = new Date()
            }
          }
          if (input.text !== undefined && input.text !== todoData.text) {
            updateAttributes.text = input.text
          }
          if (input.description && input.description !== todoData.description) {
            updateAttributes.description = input.description
          }
          if (Object.keys(updateAttributes).length) {
            updateAttributes.updatedAt = new Date()
            transaction.update(todoRef, updateAttributes)
          }

          return Object.assign(
            todoData,
            Object.assign({ id: input.id }, updateAttributes)
          )
        })
      )
    },
    deleteTodo: (_, { id }) => {
      const deleteAttributes = {
        deleted: true,
        deletedAt: new Date(),
      }
      const todoRef = firestore.collection('todos').doc(id)
      return firestore.runTransaction(transaction =>
        transaction.get(todoRef).then(todo => {
          const todoData = todo.data()
          if (!todoData.deleted) {
            transaction.update(todoRef, deleteAttributes)
          }

          return Object.assign(todoData, { id, deleted: true })
        })
      )
    },
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
    done: todo => !!todo.done,
    deleted: todo => !!todo.deleted,
  },
}
