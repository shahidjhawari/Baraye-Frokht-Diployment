const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
},{
    timestamps: true
})


const productModel = mongoose.model("product", productSchema)

module.exports = productModel
