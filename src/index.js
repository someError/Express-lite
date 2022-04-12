const App = require('./App')
const Router = require('./Router')

const router = new Router()
const PORT = process.env.PORT || 5000

router.get('/users', (req, res) => {
  res.end('GET USERS')
})

router.get('/cart', (req, res) => {
  res.end('GET CART')
})

const app = new App()

app.addRouter(router)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))