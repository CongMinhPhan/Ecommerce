const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    warehouseName: String,
    warehousePhoneNumber: String,
    warehouseAddress: String
}, {
    timestamps: true
});

const inventoryModel = mongoose.model('Inventory', inventorySchema);
module.exports = inventoryModel;