const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id: {
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

module.exports = mongoose.model('Comments', commentSchema);