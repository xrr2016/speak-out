//  findAll
//  findById
//  findOne
//  create
//  update
//  delete
//  register
//  login

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./user.model')

async function find(options = {}) {
  return await User.find(options).exec()
}

async function findAll() {
  return await User.find().exec()
}

async function findOne(options = {}) {
  return await User.findOne(options).exec()
}

async function findById(id = '') {
  return await User.findById(id).exec()
}

async function create(options = {}) {
  const user = new User(options)
  return await user.save()
}

async function update(id = '', newValue = {}) {
  const user = User.findById(id)

  if (!user._id) {
    return
  }

  await User.findByIdAndUpdate(id, newValue).exec()
  return await User.findById(id).exec()
}

async function remove(id = '') {
  try {
    await User.findByIdAndRemove(id).exec()
    return { message: '已删除' }
  } catch (err) {
    return { message: '删除失败' }
  }
}

async function register(email = '', username = '', password = '') {
  const user = await User.findOne({ email }).exec()

  if (user._id) {
    return { message: '用户已存在' }
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  await create({ email, username, password: hash })

  return {}
}

async function login(username = '', password = '') {
  const isValidPass = bcrypt.compareSync(password)
}

module.exports = {
  find,
  findAll,
  findOne,
  findById,
  create,
  update,
  login,
  register
}
