const http = require('http')
const EventEmitter = require("events")

module.exports = class App {
  constructor() {
    this.emmiter = new EventEmitter()
    this.server = this._createServer()
  }

  addRouter(router) {
    try {
      const { endpoints } = router

      Object.keys(endpoints).forEach(path => {
        const endpoint = endpoints[path]

        Object.keys(endpoint).forEach(method => {
          const handler = endpoint[method]
          this.emmiter.on(this._getEventName(path, method), (req, res) => handler(req, res))
        })
      })
    } catch (error) {
      console.log('wtf', error)
      throw new Error(error)
    }
  }

  _createServer() {
    return http.createServer((req, res) => {
      const { url, method } = req
      const hasListener = this.emmiter.emit(this._getEventName(url, method), req, res)

      if (!hasListener) {
        res.end(`Cannot ${method} ${url}`)
      }
    })
  }

  listen(port, cb) {
    this.server.listen(port, cb)
  }

  _getEventName(path, method) {
    return `[${path}]:[${method}]`
  }
}