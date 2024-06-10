const mongoose = require('mongoose');

const goodsSchema = new mongoose.Schema({
    nickname: {
        type: String
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
    },
    email: {
        type: String
    },
    _id: {
        type: String
    }
})

module.exports = mongoose.model('Posts', goodsSchema);
