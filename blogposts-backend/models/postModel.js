const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, 'Please have a title'],
        },
        keywords: {
            type: String,
        },
        body: {
            type: String,
            required: [true, 'Please add a content'],
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Post', postSchema);