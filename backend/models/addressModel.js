const mongoose = require('mongoose');

const addressDeliverySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: String,
    phoneNumber: String
}, {
    timestamps: true
});

const AddressDelivery = mongoose.model('AddressDelivery', addressDeliverySchema);
module.exports = AddressDelivery;