const router = require('express').Router()
const userService = require('./user.service')

const ONE_DAY = 24 * 60 * 60 * 1000
const letters = 'abcdefghijklmnopqrstuvwxyz'
function randomUserName() {
  let name = ''

  while (name.length < 5) {
    name += letters[Math.floor(Math.random() * letters.length)]
  }

  return name
}

router.get('/', async (req, res) => {
  const users = await userService.findAll()
  return res.status(200).json(users)
})

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body

  if (!username && !email) {
    return res.status(400).json({ success: false, message: '请求参数错误' })
  }

  const result = await userService.login(username, email, password)

  if (result.success) {
    res.cookie('token', result.token, {
      expires: new Date(Date.now() + ONE_DAY),
      httpOnly: true
    })
    return res.status(200).json(result)
  } else {
    return res.status(400).json(result)
  }
})

router.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: '注册失败' })
  }

  let username = req.body.username

  if (!username) {
    username = randomUserName()
  }

  const result = await userService.register(email, username, password)

  if (result.success) {
    return res.status(201).json(result)
  } else {
    return res.status(400).json(result)
  }
})

router
  .route('/:id')
  .get(async (req, res) => {
    res.status(200).json({ id: req.params.id })
  })
  .post(async (req, res) => {
    res.status(200).json({ id: req.params.id })
  })
  .put(async (req, res) => {
    res.status(200).json({ id: req.params.id })
  })
  .delete(async (req, res) => {
    res.status(200).json({ id: req.params.id })
  })

module.exports = router
