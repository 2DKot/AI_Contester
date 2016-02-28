/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/mongoose/mongoose.d.ts"/>
/// <reference path="../typings/oauth2-server/oauth2-server.d.ts"/>
/// <reference path="../typings/body-parser/body-parser.d.ts"/>
"use strict";

import express = require('express');
var app: express.Application = express();
import bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors: express.Router = require('./cors');
app.use(cors);

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



import oauthserver = require('oauth2-server');

var oauth = oauthserver({
  model: require('./oauth_model'),
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', oauth.grant());

app.all('/secret', oauth.authorise(), function (req, res) {
  console.log('user:', req.user);
  res.json({
      status: "ok",
      message: "Юзер c id:" + req.user.id + " достиг секретного места!"
  });
});

app.use(oauth.errorHandler());

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
