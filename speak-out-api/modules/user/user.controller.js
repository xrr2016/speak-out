const router = require('express').Router()
const userService = require('./user.service')

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

  const result = await userService.register(email, password)

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
