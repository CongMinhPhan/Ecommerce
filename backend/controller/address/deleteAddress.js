const AddressDelivery = require("../../models/addressModel");


const deleteAddress = async (req, res) => {
    try {
        const userId = req.body.userId
        const address = req.body._id

        const deleteAddress = await AddressDelivery.deleteOne({user: userId, address: address})

        if (deleteProduct.deletedCount === 0) {
            return res.json({
                message: "Address not found in cart or not authorized to delete",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Address Deleted successfully",
            error: false,
            success: true,
            data: deleteProduct
        });
    }
    catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = deleteAddress