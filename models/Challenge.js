const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ChallengeSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    image: {
        type: String
    },
    time: {
        type: String
    },
    score: Number,
    status: Boolean,
    userId: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;