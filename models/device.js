var mongoose =require("./db/connection").mongoose;
var Schema = mongoose.Schema;


var device_Schema = new Schema({
    uid: {type: Number, required: true},
    vendor: {type: String, required: true},
    date_created: {type: Date, required: true},
    status: Boolean,
    gateway:{type:Schema.Types.ObjectId, ref:"Gateway", required:true}
} ); 

var Device = mongoose.model("Device", device_Schema);

module.exports.Device = Device;