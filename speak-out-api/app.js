require('dotenv').config()

const path = require('path')
const logger = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const userRouter = require('./modules/user/user.controller')
const postRouter = require('./modules/post/post.controller')

const app = express()
const db = mongoose.connection

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })

db.on('error', () => console.error('connection error'))
db.once('open', () => console.log('mongodb connected'))

app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

module.exports = app
