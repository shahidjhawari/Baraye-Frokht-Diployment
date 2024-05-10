const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: String,
    profilePic: String,
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to ensure product image URLs are using HTTPS
productSchema.pre('save', function(next) {
  // Iterate through each product image URL
  this.productImage = this.productImage.map(imageUrl => {
    // If the URL doesn't already start with HTTPS, prepend it
    if (!imageUrl.startsWith('https://')) {
      // Assuming the URL starts with HTTP, replace it with HTTPS
      return imageUrl.replace(/^http:\/\//i, 'https://');
    }
    return imageUrl;
  });
  // Proceed to save
  next();
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
