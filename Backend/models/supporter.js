const mongoose = require('mongoose')
const { Schema } = mongoose

const Supporter = mongoose.model(
    'Supporter',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        ra: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: true
        },
        observation: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: true
        },

    },
    {timestamps: true},
    ),
)

module.exports = Supporter