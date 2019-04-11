const router = require('express').Router()
const userService = require('./user.service')

router.get('/', async function(req, res) {
  const users = await userService.findAll()
  res.status(200).json(users)
})

router.post('/login', async (req, res) => {
  res.status(200).json({ message: '登陆成功' })
})

router.post('/register', async (req, res) => {
  res.status(200).json({ message: '注册成功' })
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
