const mongoose = require('mongoose')
const { Schema } = mongoose

const Voluntary = mongoose.model(
    'Voluntary',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        RA: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: true
        },
        birthday: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        },

    },
    {timestamps: true},
    ),
)

module.exports = Voluntary