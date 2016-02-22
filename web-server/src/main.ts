/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
"use strict";

import * as Express from 'express';

var express = require('express');
var app: Express.Application = express();
var router: Express.Router = express.Router();
var bodyParser = require('body-parser');

class XModel {
    data: {x: number};
    
    constructor(){
        this.data = {x: 0};
    }
    
    get x(): number {
        return this.data.x;
    }
    
    set x(val) {
        this.data.x = val;
    }
    
    reset(){
        this.data.x = 0;
    }
}

var model: XModel = new XModel();

router.all("/*", function(req: Express.Request, res: Express.Response, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
});

router.get('/hello/:name', function(req: Express.Request, res: Express.Response, next) {
    //There is no need to check that name param isn't undefined.
    //Request /hello/ wouldn't handled by this router.
    
    res.json({
        status: "ok",
        message: "Привет, " + req.params.name + "!"
    });
});

router.get('/number', function(req: Express.Request, res: Express.Response, next){
    res.json({
        status: "ok",
        number: model.x
    })
});

router.post('/number', function(req: Express.Request, res: Express.Response, next){
    model.reset();
    res.json({
        status: "ok",
    })
});

router.put('/number', function(req: Express.Request, res: Express.Response, next){
    model.x = req.body.newNumber;
    res.json({
        status: "ok",
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});