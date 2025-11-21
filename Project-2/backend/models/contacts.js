const mongoose = require("mongoose")
const Schema = mongoose.Schema
//create contact model schema

const contactSchema = new Schema({
    id:{
        type: String,
        required:false,
    },
    productName:{
        type: String,
        required:true,
    },
    brand:{
        type:String,
        required: true,
    },
    image:{
        type: String,
        required: false,
    },
    price:{
        type: String,
        required: true,
    }
});

//package and export model
const contacts = mongoose.model("contacts", contactSchema);
module.exports = contacts;