const productModel = require('../../models/productModel');

async function deleteProduct(req, res) {
    try {
        const productId = req.body.productId;

        await productModel.findByIdAndDelete(productId);

        res.json({
            message: "Product deleted successfully",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteProduct;