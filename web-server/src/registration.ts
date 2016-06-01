/// <reference path="../typings/tsd.d.ts" />
"use strict";

import {Request, Response, Router} from 'express';
import {UserModel} from './model/oauth_models';
var router = Router();
module.exports = router;

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
    UserModel.findOne({ $or: [{username: username}, {email: email}] }, function(err, user) {
        console.log(user);
        if(err) {
            res.status(500).json({
                message: "Database error."
            });
            throw err;
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
        var user = new UserModel({
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
            }
            res.status(201).json({
                message: "User " + username + " was successfully registered."
            });
        });
    });
});