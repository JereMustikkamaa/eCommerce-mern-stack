const express = require('express')
const User = require('../models/userModel')
const getToken = require('../util')
const router = express.Router()

router.post('/signin', async (req, res) =>{
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (signinUser) {
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({msg: 'Invalid email or password'})
    }
})

router.post('/register', async (req, res) =>{
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
                token: getToken(newUser)
            })
        }
    })
    .catch(error => res.status(401).send({msg: 'Invalid user data'}))
    // if (newUser) {
    //     res.send({
    //         _id: newUser.id,
    //         name: newUser.name,
    //         email: newUser.email,
    //         isAdmin: newUser.isAdmin,
    //         token: getToken(newUser)
    //     })
    // } else {
    //     res.status(401).send({msg: 'Invalid user data'})
    // }
})

router.get("/createadmin", async (req, res) => {
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

module.exports = router