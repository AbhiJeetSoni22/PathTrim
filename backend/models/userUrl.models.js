import mongoose from "mongoose";

const userUrlSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true
    },
    longUrl:{
        type: String,
        required: true
    }
},{timestamps:true})

export const UserUrl = mongoose.model('UserUrl',userUrlSchema);