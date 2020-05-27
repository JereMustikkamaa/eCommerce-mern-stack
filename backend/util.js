require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')


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
                console.log('error');
                return res.status(401).send({ msg: 'Invalid token' })
            }  else{
                req.user = decoded;
                next()
            }
        })
    } else {
        return res.status(401).send({ msg: 'Token is not supplied' })
    }
}

const isAdmin = (req, res, next) => {
    console.log('isAdmin');

    if (req.user && req.user.isAdmin) {
        return next()
    }
    return res.status(401).send({ msg: 'Admin token is not valid' })
}

module.exports = {getToken, isAuth, isAdmin }
