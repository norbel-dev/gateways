var mongoose =require("mongoose");
mongoose.connect("mongodb://localhost/gateways");

module.exports.mongoose = mongoose;