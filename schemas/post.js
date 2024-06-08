const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Goods', goodsSchema);
