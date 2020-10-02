 const  mongoose = require('mongoose')
const crypto = require('crypto')
const uuid1 = require('uuidv1')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlenght:32
    }
    
},
    { timestamps: true }
)

module.exports = mongoose.model("Category", categorySchema)