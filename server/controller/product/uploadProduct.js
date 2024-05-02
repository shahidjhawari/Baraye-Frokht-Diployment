const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const userId = req.body.userId || sessionUserId;

    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const productData = {
      ...req.body,
      userId: userId,
      userName: user.name,
      profilePic: user.profilePic,
    };

    const uploadProduct = new productModel(productData);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;
