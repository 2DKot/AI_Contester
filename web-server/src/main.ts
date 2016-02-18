/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>

var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/hello', function(req, res, next) {
    if (!req.name) {
        res.json({
            status: "error",
            msg: "Need name field in request body"
        });
        return;
    }   
    
    res.json({
        status: "ok",
        msg: "Hello " + req.name + "."
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});