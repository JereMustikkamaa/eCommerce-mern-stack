const express = require('express')
const Product = require('../models/productModel')
const isAuth = require('../util')
const isAdmin = require('../util')

const router = express.Router()

router.get("/", (req, res, next) => {
    Product.find({})
        .then(products =>
            res.json(products.map(product => product.toJSON()))
        ).catch(error => next(error))
})

router.get("/:id", (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            if (product) {
                res.json(product)
            } else {
                res.status(404).send({ msg: "Product Not Found" })
            }
        })
        // .catch(error => next(error))
})

//isAuth ei toimi jostain syystä
router.post("/", (req, res, next) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    })
    newProduct.save()
        .then(savedProduct => {
            if (savedProduct) {
                res.status(201).send({ msg: 'New product added' })
            }
        })
        .catch(error => next(error))
})

router.put("/:id", isAuth, isAdmin, (req, res, next) => {
    const productId = req.params.id
    Product.findOne({_id: productId})
    .then(product => {
        if (product) {
            product.name = req.body.name
            product.price = req.body.price
            product.image = req.body.image
            product.brand = req.body.brand
            product.category = req.body.category
            product.countInStock = req.body.countInStock
            product.description = req.body.description

            product.save()
            .then(updatedProduct => {
                if (updatedProduct) {
                    res.status(201).send({ msg: 'Product updated' })
                }
            })
            .catch(error => next(error))
        }
    }).catch(error=> next(error))

})
//, isAuth, isAdmin
router.delete("/:id", (req, res, next) => {
    const productId = req.params.id
    Product.findById({_id: productId})
    .then(product => {
        if (product) { 
            product.remove()
            .then(updatedProduct => {
                if (updatedProduct) {
                    res.status(201).send({ msg: 'Product deleted' })
                }
            })
            .catch(error => next(error))
        }
    }).catch(error=> next(error))

})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

router.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

router.use(errorHandler)

module.exports = router