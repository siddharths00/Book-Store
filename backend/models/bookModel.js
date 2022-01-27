const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    book_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: false
    },
    images:{
        type: Object,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Books", bookSchema)