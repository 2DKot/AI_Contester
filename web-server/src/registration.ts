/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/mongoose/mongoose.d.ts"/>
/// <reference path="../typings/oauth2-server/oauth2-server.d.ts"/>
/// <reference path="../typings/body-parser/body-parser.d.ts"/>
"use strict";

import express = require('express');
import Request = express.Request;
import Response = express.Response;
var userModel = require('./model/oauth_models').Users;
var router: express.Router = express.Router();

router.post("/users", function(req: Request, res: Response, next) {
    function paramNotFound(paramName: string) {
        res.json(400, {
            message: 'Need for ' + paramName + ' in request body!'
        });
    };
    
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    if (!username) {
        paramNotFound('username');
        return;
    };
    if (!password) {
        paramNotFound('password');
        return;
    };
    if(!email) {
        paramNotFound('email'); 
        return;
    };
    //TODO: username || email
    userModel.find({ username: username }, function(err, user) {
        if(err) {
            res.json(500, {
                message: "Database error."
            });
            throw err;
            return;
        }
        if (user) {
            if(user.username == username) {
                var conflictPart = "name " + username; 
            }
            else {
                var conflictPart = "email " + email;
            }
            res.json(409, {
                message: 'There is already user with ' + conflictPart + '.'
            });
            return;
        }
        var user = new userModel({
            username: username,
            password: password,
            email: email
        });
        user.save(function(err) {
            if(err) {
                res.json(500, {
                    message: "Database error."
                });
                throw err;
                return;
            };
            res.json(201, {
                message: "User " + username + "was successfully registered."
            });
        });
    });
});

module.exports = router;