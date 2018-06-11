const { renderPlaygroundPage } = require('graphql-playground-html')

const options = { version: '1.7.0', endpoint: '/graphql' }

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  const playground = renderPlaygroundPage(options)
  res.send(playground)
}
