const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }, // Tham chiếu đến sản phẩm
    quantity: Number, // Số lượng sản phẩm trong kho
}, {
    timestamps: true
});

const inventoryModel = mongoose.model('inventory', inventorySchema);

module.exports = inventoryModel;
