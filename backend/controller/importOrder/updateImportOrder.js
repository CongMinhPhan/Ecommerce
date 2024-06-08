const uploadProductPermission = require('../../helpers/permission');
const importOrderModel = require('../../models/importOrderModel');

const updateImportOrder = async (req, res) => {
    try {
        // Kiểm tra quyền người dùng
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        // Lấy dữ liệu từ body request
        const { _id, ...resBody } = req.body;

        // Cập nhật đơn hàng nhập trong cơ sở dữ liệu
        const updateImportOrder = await importOrderModel.findByIdAndUpdate(_id, resBody, { new: true });

        res.status(200).json({
            message: "Import Order updated successfully",
            data: updateImportOrder,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Failed to update import order',
            error: true,
            success: false
        });
    }
}

module.exports = updateImportOrder;
