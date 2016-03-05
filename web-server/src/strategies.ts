"use strict";

import {Request, Response, Router} from 'express';

var router = Router();
import oauthModule = require('./oauth');
import getUser = oauthModule.getUser;

import mongoose = require('mongoose');
import Model = mongoose.Model;
var userModel = require('./model/oauth_models').Users;

router.post("/strategies", getUser, function(req: Request, res: Response, next) {
  res.status
});

module.exports = router;
