/// <reference path="../typings/tsd.d.ts" />
"use strict";

import {Request, Response, Router} from 'express';
import {UserModel, IUser} from './model/oauth_models';
import {Types} from 'mongoose'

var router = Router();
module.exports = router;

router.get("/:id", function(req: Request, res: Response, next) {
    console.log("intered in users/" + req.params.id);
    UserModel.findOne({ _id: new Types.ObjectId(req.params.id) }, { password: 0 },
        (err: any, user: IUser) => {
            console.log("find complete");
            if (err) {
                res.status(500).json({
                    message: "Database error."
                });
                throw err;
            }
            console.log("there is no errors");
            if (!user) {
                console.log("not found");
                res.status(200).json({
                    message: "User wasn't found."
                });
                return;
            }
            console.log("oh yeas");
            res.status(200).json({
                message: "User was found.",
                user: user
            });
    });
});
