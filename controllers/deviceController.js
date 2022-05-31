var Device = require("../models/device").Device;
var Gateway = require("../models/gateway").Gateway;
var GatewayController = require("./gatewayController");



const DeviceController = {}

function index(req, res) {
    //Find All docs (Devices)
    Device.find({})
          .populate("gateway")
          .exec(function (err, docs) {
                if (err){
                    console.log(String(err));
                }
                res.render("devices/index", {devices: docs});
            })
}

function create(req, res) {
    //find all gateways that have less than 10 devices
    //Create a new device
    Gateway.find({deviceCount:{ $lt: 10 }}, function (err, docs) {
        if (err){
            console.log(String(err));
        }
        res.render("devices/create", {gateways:docs});
    })
    
}

function store(req, res) {
    //Store a device
    var device = new Device({
        uid:            req.body.uid,
        vendor:         req.body.vendor,
        date_created:   req.body.date_created,
        status:         req.body.status=='on'?true:false,
        gateway:        req.body.gateway
    });
    device.save(function (err) {
        if (err){
            console.log(String(err));
            res.redirect("/app/devices/new");
        }
        //Increment device count
        GatewayController.deviceCountUpdate(req.body.gateway, true);
        res.redirect("/app/devices/"+device._id);
    }) 
    
}

function show(req, res, id) {
    //Show Details of a device
    Device.findById(id)
        .populate("gateway")
        .exec( function (err, doc) {
            if (err){
                console.log(String(err));
            }
            res.render("devices/show", {device: doc});
        })
}

function edit(req, res, id) {
    //Edit device
    Gateway.find({deviceCount:{ $lt: 10 }}, function (err, docs) {
        if (err){
            console.log(String(err));
        }
        Device.findById(id)
        .populate("gateway")
        .exec( function (err, doc) {
            if (err){
                console.log(String(err));
            }
            res.render("devices/edit", {device: doc, gateways:docs});
        })
    })
    
}

function update(req, res, id) {
    //Update device
    Device.findById(id, function (err, doc) {
        if (err){
            console.log(String(err));
        }
        doc.uid=            req.body.uid;
        doc.vendor=         req.body.vendor;
        doc.date_created=   req.body.date_created;
        doc.status=         req.body.status=='on'?true:false;
        //if change the parent gateway, then decrement device count
        if (doc.gateway!= req.body.gateway){
            GatewayController.deviceCountUpdate(doc.gateway, false);
        }
        doc.gateway=        req.body.gateway;
        
        doc.save(function (err) {
            if (err){
                console.log(String(err));
            }
            //Increment device count
            GatewayController.deviceCountUpdate(req.body.gateway, true);
            })
    });
    res.redirect("/app/devices");
}

function destroy(req, res, id) {
    //Update gateway count device
    Device.findById(id, function (err, doc) {
        if (err){
            console.log(String(err));
        }
        GatewayController.deviceCountUpdate(doc.gateway, false);
    })
    //Delete device
    Device.findOneAndRemove({_id: id}, function (err) {
        if (err){
            console.log(String(err));
        }
        res.redirect("/app/devices");
    })
}

function group(req, res, id_gateway) {
    //Find All docs (Devices)
    Device.find({gateway: id_gateway})
        .populate("gateway")
        .exec( function (err, docs) {
                if (err){
                    console.log(String(err));
                }
                res.render("devices/index_group", {devices: docs});
            })
}

async function existsById(uid) {
    /* Device.find({uid: uid}, function (err, docs) {
        if (err){
            console.log(String(err));
        }
        console.log("Estamos en el metodo: " + docs);
        if (docs.length>0){
            return true;
        }
        
    }) */
    const docs = await Device.find({uid: uid});
    if (docs.length>0){
        return true;
    }
    return false;
}

DeviceController.index = index;
DeviceController.create = create;
DeviceController.store = store;
DeviceController.show = show;
DeviceController.edit = edit;
DeviceController.update = update;
DeviceController.destroy = destroy;
DeviceController.group = group;
DeviceController.existsById = existsById;

module.exports = DeviceController;