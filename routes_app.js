var express = require("express");
var GatewayController = require("./controllers/gatewayController");
var DeviceController = require("./controllers/deviceController");
const {body, validationResult} = require("express-validator");
const {validatorMiddleWare} = require("./validators/device");
var Device = require("./models/device").Device;

var router = express.Router();
//Home
router.get("/", function (req, res) {
    res.render("home");    
})

//All routes for gateways
router.get("/gateways/new", function (req, res) {
    GatewayController.create(req, res);
})

router.get("/gateways/:id/edit", function (req, res) {
    GatewayController.edit(req, res, req.params.id);
})

router.get("/gateways/:id/validate", function (req, res) {
    GatewayController.validating(req, res, req.params.id);
})

router.route("/gateways/:id")
    .get(function (req, res) {
        GatewayController.show(req, res, req.params.id);
    })
    .put(function (req, res) {
        GatewayController.update(req, res, req.params.id);
    })
    .delete(function (req, res) {
        GatewayController.destroy(req, res, req.params.id);
    });

router.route("/gateways")
    .get(function (req, res) {
        GatewayController.index(req, res);
    })
    .post(function (req, res) {
        GatewayController.store(req, res);
    });
//End all routes for gateways

//All routes for devices
router.get("/devices/new", function (req, res) {
    DeviceController.create(req, res);
})

router.get("/devices/:id/edit", function (req, res) {
    DeviceController.edit(req, res, req.params.id);
})

router.get("/devices/:id/group", function (req, res) {
    DeviceController.group(req, res, req.params.id);
})

router.route("/devices/:id")
    .get(function (req, res) {
        DeviceController.show(req, res, req.params.id);
    })
    .put([
        validatorMiddleWare
    ],function (req, res) {
        const errors = validationResult(req);
            if (!errors.isEmpty()){
                const values = req.body;
                const validations = errors.array();
                res.render("devices/edit", {values: values, validations: validations});
            }
            else{
                DeviceController.update(req, res, req.params.id);
            }
    })
    .delete(function (req, res) {
        DeviceController.destroy(req, res, req.params.id);
    });

router.route("/devices")
    .get(function (req, res) {
        DeviceController.index(req, res);
    })
    .post([
            validatorMiddleWare
        ], function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                const values = req.body;
                const validations = errors.array();
                res.render("devices/create", {values: values, validations: validations});
            }
            else{
                DeviceController.store(req, res);
            }
    });
//End all routes for devices
module.exports = router;