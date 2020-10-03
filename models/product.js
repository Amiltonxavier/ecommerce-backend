const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlenght: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlenght: 200
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlenght: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }

},
    { timestamps: true }
);

//Virtual field

module.exports = mongoose.model("Product", productSchema)