var Gateway = require("../models/gateway").Gateway;

const GatewayController = {}

function index(req, res) {
    //Find All docs (gateways)
    Gateway.find({}, function (err, docs) {
        if (err){
            console.log(String(err));
        }
        res.render("gateways/index", {gateways: docs});
    })
}

function create(req, res) {
    //Create a new gateway
    res.render("gateways/create");
}

function store(req, res) {
    //Store a gateway
    var gateway = new Gateway({
        serialNumber: req.body.serialNumber,
        name: req.body.name,
        ipv4: req.body.ipv4,
        deviceCount: 0, 
        toBeValidated:true
    });
    gateway.save(function (err) {
    if (err){
        console.log(String(err));
    }
    })
    res.render("gateways/show", {gateway: gateway});
}

function show(req, res, id) {
    //Show Details of a gateway
    Gateway.findById(id, function (err, doc) {
        if (err){
            console.log(String(err));
        }
        res.render("gateways/show", {gateway: doc});
    })
}

function edit(req, res, id) {
    //Edit gateway
    Gateway.findById(id, function (err, doc) {
        if (err){
            console.log(String(err));
        }
        res.render("gateways/edit", {gateway: doc});
    })
}

function update(req, res, id) {
    //Update gateway
    Gateway.findById(id, function (err, doc) {
        if (err){
            console.log(String(err));
        }
        doc.serialNumber= req.body.serialNumber;
        doc.name= req.body.name;
        doc.deviceCount = req.body.deviceCount;
        if (doc.ipv4 != req.body.ipv4){
            doc.ipv4 = req.body.ipv4;
            doc.toBeValidated = true;
        }

        doc.save(function (err) {
            if (err){
                console.log(String(err));
            }
            })
    });
    res.redirect("/app/gateways");
}

function destroy(req, res, id) {
    //Delete gateway
    Gateway.findOneAndRemove({_id: id}, function (err) {
        if (err){
            console.log(String(err));
        }
        res.redirect("/app/gateways");
    })
}

function validating(req, res, id) {
    //Show Details of a gateway
    Gateway.findById(id, function (err, doc) {
        if (err){
            console.log(String(err));
        }
        if(validatingAux(doc)){
            doc.toBeValidated = false;

            doc.save(function (err) {
                if (err){
                    console.log(String(err));
                }
                })

            res.render("gateways/show", {gateway: doc});
        }else{
            res.render("gateways/show", {gateway: doc, edit:true});
        }
    })
}

function validatingAux(doc) {
    var blocks = String(doc.ipv4).split(".");
    if (blocks.length!=4){
        return false;
    }
    for (let index = 0; index < blocks.length; index++) {
        const element = blocks[index];
        //If not a number
        if(!Number(element)){
            return false;
        }
        const nint = Number(element);
        //if the number is not in range[0..255]
        if (nint<0 || nint > 255){
            return false;
        }
        //if the number in first block is equal to 0
        if(index==0 && nint == 0){
            return false;
        }
        //if the number in last block is equal to 0 or equal to 255
        if(index==3 && (nint == 0 || nint == 255)){
            return false;
        }
    }
    return true;
}

function deviceCountUpdate(id, increment) {
    
    Gateway.findById({_id: id}, function (err, doc) {
        if (err){
            console.log(String(err));
        }
        if (increment){
            doc.deviceCount++;
        }else{
            doc.deviceCount--;
        }
        doc.save(function (err1) {
            if (err1){
                console.log(String(err1));
            }
            })
    })
}

GatewayController.index = index;
GatewayController.create = create;
GatewayController.store = store;
GatewayController.show = show;
GatewayController.edit = edit;
GatewayController.update = update;
GatewayController.destroy = destroy;
GatewayController.validating = validating;
GatewayController.deviceCountUpdate = deviceCountUpdate;

module.exports = GatewayController;