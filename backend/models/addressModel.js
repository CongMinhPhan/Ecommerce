const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Tham chiếu đến người dùng
    address: String,
    phoneNumber: String
}, {
    timestamps: true
});

const addressModel = mongoose.model('address', addressSchema);

module.exports = addressModel;
