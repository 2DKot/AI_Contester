"use strict";

import oauthserver = require('oauth2-server');

export var oauth = oauthserver({
  model: require('./oauth_model'),
  grants: ['password'],
  debug: true
});


import {UserModel, IUser} from './model/oauth_models';
import {Request, Response, Router} from 'express';

export interface AuthorisedRequest extends Request {
    user: IUser;
}

export var getUser = Router();

getUser.use(oauth.authorise());
getUser.use(function getUser(req: Request, res: Response, next) {
    console.log("I'm in getUser")
    console.log(req.user);
    UserModel.findOne({ _id: req.user.id }, function(err, user) {
        if (err) {
            res.status(500).json({
                message: "Database error."
            });
            console.log(err.message);
            return;
        };
        if (!user) {
            res.status(404).json({
                message: "User with id " + req.user.id + " wasn't found."
            });
            return;
        }
        req.user = user;
        next();
    });
});
