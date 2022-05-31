var express = require("express");
var bodyParser = require("body-parser");
var router_app = require("./routes_app");
var methodOverride = require("method-override");


var app = express();

app.use("/public", express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));

app.set("view engine", "jade");

app.use("/app", router_app);

app.listen(8080);