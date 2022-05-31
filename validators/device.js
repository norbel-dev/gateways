const {body, validationResult} = require("express-validator");
var Device = require("../models/device").Device;


const validatorMiddleWare = [
    body("uid")
        .exists()
        .custom(value => {
            return Device.findOne({uid: value}).then(device => {
                if (device) {
                return Promise.reject('Id already in use');
                }
            });
        })
]

module.exports = {validatorMiddleWare}