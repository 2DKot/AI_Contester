"use strict";

import express = require('express');
var app: express.Application = express();
import bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

import {cors} from './cors';
app.use(cors);

var registration: express.Router = require('./registration');
app.use(registration);

var router: express.Router = express.Router();

router.get('/hello/:name', function(req: express.Request, res: express.Response, next) {
    //There is no need to check that name param isn't undefined.
    //Request /hello/ wouldn't handled by this router.
    
    res.json({
        status: "ok",
        message: "Привет, " + req.params.name + "!"
    });
});

router.post('/test', function(req: express.Request, res: express.Response, next) {
    console.log(req.headers);
    console.log(req.body);
    res.end();
});

app.use(router);


import {oauth, getUser, AuthorisedRequest} from './oauth';

app.all('/oauth/token', oauth.grant());

import {Model} from 'mongoose';
import {UserModel} from './model/oauth_models';
import Response = express.Response;

app.all('/secret', getUser, function(req: AuthorisedRequest, res: Response) {
    console.log('user:');
    console.log(req.user);
    res.status(200).json({
        message: "Юзер " + req.user.username + " c почтой " + req.user.email + " достиг секретного места!"
    });
});

app.use(oauth.errorHandler());

app.listen(3000, function () {
  console.log('Backend-server listening on port 3000!');
});
