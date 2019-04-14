const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = Schema(
  {
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
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updateed_at' },
    autoIndex: false
  }
)

module.exports = mongoose.model('Post', postSchema)
