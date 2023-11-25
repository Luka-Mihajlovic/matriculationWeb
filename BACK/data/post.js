const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    uploadedBy:{
        type:String,
        trim:true,
        required:true
    },

    eventName:{
        type:String,
        trim:true,
        required:true
    },

    eventDateTime:{
        type:String,
        required:true
    },

    eventDescription:{
        type:String,
        trim:true,
        required:true
    },

    eventType:{
        type:String,
        trim:true,
        required:true,
    },

    eventPrice:{
        type:Number,
        required:true
    },

    isFree:{
        type:Boolean,
        required: true
    },

    postImage:{
        type: String,
        required:true
    },

    lat:{
        type:Number,
        required:true
    },

    lon:{
        type:Number,
        required:true
    },

    reserves:{
        type:[String],
        required:true
    }
})

module.exports = mongoose.model("userPost", postSchema);