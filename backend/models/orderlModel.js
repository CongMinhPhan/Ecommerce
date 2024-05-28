const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Tham chiếu đến người dùng
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }, 
        quantity: Number, 
    }],
    totalAmount: Number, // Tổng số tiền của đơn hàng
    status: String, // Trạng thái của đơn hàng (đang xử lý, đã giao hàng, đã hủy, v.v.)
    paymentMethod: { type: String, enum: ['Thanh toán khi nhận hàng', 'Thanh toán Online'] }, 
}, {
    timestamps: true
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
