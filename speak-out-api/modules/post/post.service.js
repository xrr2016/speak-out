const Post = require('./post.model')

async function find(options = {}) {
  return await Post.find(options).exec()
}

async function findAll() {
  return await Post.find().exec()
}

async function findOne(options = {}) {
  return await Post.findOne(options).exec()
}

async function findById(id = '') {
  return await Post.findById(id).exec()
}

async function pagination(currentPage = 0, pageSize = 10) {
  const posts = await Post.find()
    .populate({
      path: 'author',
      select: 'username avatar'
    })
    .skip(currentPage * pageSize)
    .limit(pageSize)
    .exec()

  return posts
}

async function create(detail = {}) {
  const post = new Post(detail)
  return await post.save()
}

async function update(id = '', updates = {}) {
  const post = Post.findById(id)

  if (post === null) {
    return { success: false, message: '资源不存在' }
  }

  await Post.findByIdAndUpdate(id, updates).exec()
  return await Post.findById(id).exec()
}

async function remove(id = '') {
  try {
    await Post.findByIdAndRemove(id).exec()
    return { success: true, message: '已删除' }
  } catch (err) {
    return { success: false, message: '删除失败' }
  }
}

module.exports = {
  find,
  findAll,
  findOne,
  findById,
  create,
  update,
  remove,
  pagination
}
