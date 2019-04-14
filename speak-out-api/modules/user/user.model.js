const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const TWO_HOURS = '2h'
const JWT_SECRET = process.env.JWT_SECRET

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updateed_at' },
    autoIndex: false
  }
)

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateToken = function() {
  return jwt.sign(
    { id: this._id, email: this.email, username: this.username },
    JWT_SECRET,
    { expiresIn: TWO_HOURS }
  )
}

module.exports = mongoose.model('User', userSchema)
