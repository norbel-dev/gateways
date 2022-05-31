var mongoose =require("./db/connection").mongoose;
var Schema = mongoose.Schema;

var gateway_Schema = new Schema({
    serialNumber: {type: String, required: true},
    name: {type: String, required: true},
    ipv4: {type: String, required: true},
    toBeValidated: Boolean,
    deviceCount: Number
} ); 

var Gateway = mongoose.model("Gateway", gateway_Schema);

module.exports.Gateway = Gateway;