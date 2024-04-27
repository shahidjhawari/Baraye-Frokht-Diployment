const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }
        
        // Extract user ID from the request
        const userId = req.body.userId || sessionUserId;

        // Create the product object with user's ID
        const productData = {
            ...req.body,
            userId: userId
        };

        const uploadProduct = new productModel(productData);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = UploadProductController;
