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
    userModel.findOne({ $or: [{username: username}, {email: email}] }, function(err, user) {
        console.log(user);
        if(err) {
            res.status(500).json({
                message: "Database error."
            });
            throw err;
            return;
        }
        if (user) {
            if(user.username == username) {
                var conflictPart = "name " + username; 
            }
            else if(user.email == email) {
                var conflictPart = "email " + email;
            }
            res.status(409).json({
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
                res.status(500).json({
                    message: "Database error."
                });
                throw err;
                return;
            };
            res.status(201).json({
                message: "User " + username + " was successfully registered."
            });
        });
    });
});

module.exports = router;