const mongoose = require('mongoose');

const UserSchma =  new mongoose.Schema({
    userName: String,
    password : String
});

//db.user.find()
module.exports = mongoose.model('user',UserSchma);