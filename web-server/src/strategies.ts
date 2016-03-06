"use strict";

import {Request, Response, Router} from 'express';
import {getUser, AuthorisedRequest} from './oauth';
import {UserModel} from './model/oauth_models';
import {StrategyModel, IStrategy} from './model/strategy'

var router = Router();
module.exports = router;

router.post("/", getUser, function(req: AuthorisedRequest, res: Response, next) {
    function paramNotFound(paramName: string) {
        res.json(400, {
            message: 'Need for ' + paramName + ' in request body!'
        });
    };
    
    var source = req.body.source;

    if(!source) {
        paramNotFound('source');
        return;
    }
    
    console.log("User " + req.user.username + " sended strategy: ");
    console.log(source);
});
