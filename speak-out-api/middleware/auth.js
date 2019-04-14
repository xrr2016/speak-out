const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = function(req, res, next) {
  let token = ''

  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies) {
    token = req.cookies.token
  }

  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      return res.status(401).json({ success: false, message: err.message })
    } else {
      next()
    }
  })
}
