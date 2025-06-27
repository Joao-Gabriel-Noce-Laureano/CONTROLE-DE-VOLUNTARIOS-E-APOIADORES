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
        ra: {
            type: String,
            required: false
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