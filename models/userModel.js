const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : String,
    password : String,
    email : String
},{collection: "Users"});

module.exports = mongoose.model("Users",userSchema);