const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true},
    email: { type: String, required: true, unique: true, dropDubs: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false},
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)