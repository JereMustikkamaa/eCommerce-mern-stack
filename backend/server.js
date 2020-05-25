require('dotenv').config()
const url = process.env.MONGO_DB
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Product = require('./models/productModel')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const bodyParser = require('body-parser')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors())
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

console.log('Connecting to mongodb')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

// app.use(bodyParser.json())

app.use("/api/users", userRoute)
app.use("/api/products", productRoute)


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server started at localhost:5000'))