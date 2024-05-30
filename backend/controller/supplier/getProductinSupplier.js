const productModel = require("../../models/productModel");

const getProductInSupplier = async () => {
    try {
        const productIds = req.body.productIds;
        const products = await productModel.find({ _id: { $in: productIds } });
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = getProductInSupplier