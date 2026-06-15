const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async(req,res)=>{
    try{
        const { category } = req?.body || req?.query
        console.log("Category received:", category)  // ✅ yeh dekho terminal mein

        const product = await productModel.find({ category })
        console.log("Products found:", product.length)  // ✅ kitne products mile

        res.json({
            data : product,
            message : "Product",
            success : true,
            error : false
        })
    }catch(err){
        console.log("Error:", err)  // ✅ exact error dekho
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCategoryWiseProduct