const express = require('express')
const User = require('../models/userModel')
const utils = require('../util')
const router = express.Router()
const middleware = require('../middleware')

router.post('/signin', (req, res, next ) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    })
        .then(signinUser => {
            if (signinUser) {
                res.send({
                    _id: signinUser.id,
                    name: signinUser.name,
                    email: signinUser.email,
                    isAdmin: signinUser.isAdmin,
                    token: utils.getToken(signinUser)
                })
            }
        })
        .catch(error => next(error))
})

router.post('/register', (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    user.save()
        .then(newUser => {
            if (newUser) {
                res.send({
                    _id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                    token: utils.getToken(newUser)
                })
            }
        })
        .catch(error => next(error))
})


router.get("/createadmin", (req, res, next) => {
    const user = new User({
        name: 'Jere',
        email: 'jere_mus@hotmail.com',
        password: '1234',
        isAdmin: true
    })

    user.save()
        .then(savedUser => {
            res.json(savedUser)
        })
        .catch(error => next(error))

})

router.use(middleware.unknownEndpoint)
router.use(middleware.errorHandler)

module.exports = router