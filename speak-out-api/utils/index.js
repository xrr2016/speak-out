const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const TWO_HOURS = 2 * 60 * 60 * 1000

function createToken(user) {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    secret,
    { expiresIn: TWO_HOURS }
  )

  return {
    accessToken,
    expiresIn
  }
}

async function verifyToken(token) {
  return await jwt.verify(token, secret)
}

module.exports = {
  createToken,
  verifyToken
}
