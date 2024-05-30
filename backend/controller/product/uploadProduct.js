const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

const UploadProductController= async (req,res)  => {
    try{
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }
    
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(200).json({
            message : "Product upload successfully",
            error : false,
            success : true,
            data : saveProduct
        })

    }
    catch(err){
        res.status(401).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = UploadProductController