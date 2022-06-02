var mongoose =require("mongoose");

const {user, pass, db} = require("../../config/db");

mongoose.connect("mongodb+srv://"+user+":"+pass+"@cluster0.cu7wx.mongodb.net/"+db+"?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  })

  module.exports.mongoose = mongoose; 