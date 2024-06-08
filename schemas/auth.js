const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    pw: {
        type: String,
        required: true,
        minlength: 4
    }
});

authSchema.methods.setPassword = async function (plainPassword, encryptionService) {
    this.pw = await encryptionService.encryptPassword(plainPassword);
}

authSchema.methods.validatePassword = async function (plainPassword, encryptionService) {
    return await encryptionService.verifyPassword(plainPassword, this.pw);
}

module.exports = mongoose.model('Auth', authSchema);