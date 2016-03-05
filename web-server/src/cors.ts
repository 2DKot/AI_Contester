"use strict";

import {Request, Response, Router} from 'express';

export var cors: Router = Router();

cors.all("/*", function(req: Request, res: Response, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
    console.log("method: ", req.method)
    console.log("headers: ", req.headers);
    console.log("body: ", req.body);
    next();
});

cors.options("/*", function(req: Request, res: Response, next) {
    res.statusCode = 204;
    res.end();
});
