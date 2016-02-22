/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>

import * as Express from 'express';

var express = require('express');
var app: Express.Application = express();
var router: Express.Router = express.Router();
var bodyParser = require('body-parser');

router.get('/hello/:name', function(req: Express.Request, res: Express.Response, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    //There is no need to check that name param isn't undefined.
    //Request /hello/ wouldn't handled by this router.
    
    res.json({
        status: "ok",
        message: "Привет, " + req.params.name + "!"
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});