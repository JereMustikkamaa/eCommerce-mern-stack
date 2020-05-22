// import express from 'express'
// import data from './data'

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())


morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const products = [{
    _id: '1',
    name: "BeerBuddy",
    category: 'v1',
    image: '/images/d1.jpg',
    price: 50,
    brand: 'SW',
    rating: 4.9,
    numReviews: 10,
    description: 'ihmekakkaa1'
},
{
    _id: '2',
    name: "BeerBuddyy",
    category: 'v2',
    image: '/images/d1.jpg',
    price: 30,
    brand: 'SW',
    rating: 4.9,
    numReviews: 20,
    description: 'ihmekakkaa2'
},
{
    _id: '3',
    name: "BeerBuddyy222",
    category: 'v1',
    image: '/images/d1.jpg',
    price: 50,
    brand: 'SW',
    rating: 4.9,
    numReviews: 30,
    description: 'ihmekakkaa3'
},

]

app.get("/api/products", (req, res) => {
    res.send(products);
    //res.send(data.products);
    
})
app.get("/api/products:id", (req, res) => {
    const productId = req.params.id
    const product = data.products.find(x => x._id === productId);
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ msg: "Product Not Found"})
    }
    //res.send(data.products);
    
})

app.listen(5000, () => console.log('Server started at localhost:5000'))