var Gateway = require("../models/gateway").Gateway;

/* const gatewaysMiddleWare = function (req, res, next) {
    Gateway.find({deviceCount:{ $lt: 10 }}, function (err, docs) {
        if (docs!=null){
            res.locals.gateways = docs;
            console.log(docs);
            next();
        }
    })
} */

const gatewaysMiddleWare = [
    (req,res,next)=>{
        console.log("Pasó 1");
        Gateway.find({deviceCount:{ $lt: 10 }}, function (err, docs) {
            console.log("Pasó 2");
            if (docs!=null){
                res.locals.gateways = docs;
                console.log(docs);
            }
        }),
        next();
    }
]

module.exports = {gatewaysMiddleWare}