/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/mongoose/mongoose.d.ts"/>
/// <reference path="../typings/oauth2-server/oauth2-server.d.ts"/>
/// <reference path="../typings/body-parser/body-parser.d.ts"/>
"use strict";

import express = require('express');
var router: express.Router = express.Router();
router.all("/*", function(req: express.Request, res: express.Response, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
    console.log("method: ", req.method)
    console.log("headers: ", req.headers);
    console.log("body: ", req.body);
    next();
});

router.options("/*", function(req: express.Request, res: express.Response, next) {
    res.statusCode = 204;
    res.end();
});

module.exports = router;