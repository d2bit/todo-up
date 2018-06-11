module.exports.fixPath = function fixPath(app) {
  return (req, res) => {
    if (!req.path) {
      req.path = '/'
      req.url = `/${req.url}`
    }

    return app(req, res)
  }
}
