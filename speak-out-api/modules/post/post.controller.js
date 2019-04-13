const router = require('express').Router()
const postService = require('./post.service')

router.get('/', async (req, res) => {
  const posts = await postService.findAll()
  return res.status(200).json(posts)
})

router.post('/', async (req, res) => {
  const { title, content, author } = req.body

  if (!title || !author) {
    return res.status(400).json({ success: false, message: '请求参数错误' })
  }

  const result = await postService.create({ title, content, author })

  return res.status(201).json(result)
})

router.get('/pagination', async (req, res) => {
  const { page = 0, size = 10 } = req.query
  const posts = await postService.pagination(parseInt(page), parseInt(size))

  return res.status(200).json(posts)
})

router
  .route('/:id')
  .get(async (req, res) => {
    const id = req.params.id
    const result = await postService.findById(id)
    res.status(200).json(result)
  })
  .put(async (req, res) => {
    const id = req.params.id
    const updates = req.body

    if (updates === null) {
      return res.status(400).json({ success: false, message: '请求参数错误' })
    }

    const result = await postService.update(id, updates)

    if (result.success) {
      return res.status(200).json(result)
    } else {
      return res.status(500).json(result)
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id
    const result = await postService.remove(id)

    if (result.success) {
      return res.status(200).json(result)
    } else {
      return res.status(500).json(result)
    }
  })

module.exports = router
