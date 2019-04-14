//  findAll
//  findById
//  findOne
//  create
//  update
//  delete
//  register
//  login
//  verify
//  exit

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

async function create(info = {}) {
  const user = new User(info)
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

  if (user !== null) {
    return { success: false, message: '注册失败, 用户已存在' }
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const avatar = `${process.env.USER_AVATAR_URL}${username.slice(0, 1)}`
  const result = await create({ email, username, avatar, password: hash })

  return {
    success: true,
    message: '注册成功',
    user: {
      level: result.level,
      id: result._id,
      email: result.email,
      avatar: result.avatar,
      username: result.username
    }
  }
}

async function login(username = '', email = '', password = '') {
  let user = null

  if (username) {
    user = await User.findOne({ username }).exec()
  } else if (email) {
    user = await User.findOne({ email }).exec()
  }

  if (user === null) {
    return { success: false, message: '用户不存在' }
  }

  if (!user.comparePassword(password)) {
    return { success: false, message: '用户密码错误' }
  }

  const token = user.generateToken()

  return {
    success: true,
    message: '登陆成功',
    token,
    user: {
      id: user._id,
      level: user.level,
      email: user.email,
      avatar: user.avatar,
      username: user.username
    }
  }
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
