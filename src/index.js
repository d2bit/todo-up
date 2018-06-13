import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import registerServiceWorker from './registerServiceWorker'
import apolloClient from './apollo-client'
import App from './App'
import './index.css'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
