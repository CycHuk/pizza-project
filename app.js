const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')

require('dotenv').config()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, './client/build')))

app.use('/users', require('./routes/users'))
app.use('/products', require('./routes/products'))
app.use('/image', require('./routes/image'))
app.use('/order', require('./routes/order'))

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + './client/build/index.html'))
})

module.exports = app
