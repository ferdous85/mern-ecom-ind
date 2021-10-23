const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const errorMiddleware = require('./middleware/error')

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())

//Route imports

const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')

app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)

//Middleware for error
app.use(errorMiddleware)

module.exports = app