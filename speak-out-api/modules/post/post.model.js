const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    default: ''
  },
  vote: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Post', postSchema)
