const uploadProductPermission = require("../../helpers/permission");
const importOrderModel = require("../../models/importOrderModel");


const uploadImportOrder = async (req, res) => {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        const newImportOrder = new importOrderModel(req.body);
        const saveImportOrder = await newImportOrder.save();

        res.status(201).json({
            message : "Import Order upload successfully",
            error : false,
            success : true,
            data : saveImportOrder
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Failed to create import order',
            error: true,
            success: false
        });
    }
}

module.exports = uploadImportOrder;