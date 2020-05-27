require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const middleware = require('./middleware')


const getToken = (user) => {
    console.log('getToken');
    
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, JWT_SECRET, {
        expiresIn: '48h'
    })
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization || req.headers['x-access-token']
    
    if (token) {
        const onlyToken = token.slice(7, token.length)
        console.log(onlyToken);
        
        jwt.verify(onlyToken, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ error: 'Invalid token' })
            }  else{
                req.user = decoded;
                next()
            }
        })
    } else {
        return res.status(401).send({ error: 'Token is not supplied' })
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next()
    }
    return res.status(401).send({ error: 'Admin token is not valid' })
}


module.exports = {getToken, isAuth, isAdmin }
