const uploadProductPermission = require("../../helpers/permission");
const importOrderModel = require("../../models/importOrderModel");
const supplierModel = require("../../models/supplierModel");

const uploadImportOrder = async (req, res) => {
    try {
        const sessionUserId = req.userId;

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        // Tạo đơn hàng mới
        const newImportOrder = new importOrderModel(req.body);
        const saveImportOrder = await newImportOrder.save();

        // Cập nhật supplier với đơn hàng mới
        const supplierUpdate = await supplierModel.findByIdAndUpdate(
            saveImportOrder.supplier,
            { $push: { orders: saveImportOrder._id } },
            { new: true, useFindAndModify: false }
        );

        if (!supplierUpdate) {
            throw new Error("Supplier not found or failed to update");
        }

        res.status(201).json({
            message: "Import Order uploaded successfully",
            error: false,
            success: true,
            data: saveImportOrder
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Failed to create import order',
            error: true,
            success: false
        });
    }
};

module.exports = uploadImportOrder;
