const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String,
    role: String,
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddressDelivery' }], // Tham chiếu đến địa chỉ của người dùng
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
