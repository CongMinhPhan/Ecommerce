const mongoose = require('mongoose');

const importOrderSchema = new mongoose.Schema({
    orderCode: String,
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    importDate: Date,
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }]
}, {
    timestamps: true
});

const importOrderModel = mongoose.model('ImportOrder', importOrderSchema);
module.exports = importOrderModel;
