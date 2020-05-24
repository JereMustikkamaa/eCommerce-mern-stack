const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, default: 0, required: true},
    countInStock: {type: Number, default: 0, required: true},
    description: {type: String},
    rating: {type: Number, default: 0, required: true},
    numReviews: {type: Number, default: 0, required: true},
})

productSchema.plugin(uniqueValidator)

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Product', productSchema)