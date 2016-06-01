/// <reference path="../typings/tsd.d.ts" />
"use strict";

import {Request, Response, Router} from 'express';
import {getUser, AuthorisedRequest} from './oauth';
import {UserModel} from './model/oauth_models';
import {StrategyModel, IStrategy} from './model/strategy'

var router = Router();
module.exports = router;

router.post("/", getUser, function(req: AuthorisedRequest, res: Response, next) {
    function paramNotFound(paramName: string) {
        res.status(400).json({
            message: 'Need for ' + paramName + ' in request body!'
        });
    };
    
    var source = req.body.source;

    if(!source) {
        paramNotFound('source');
        return;
    }
    
    
    var strategy = new StrategyModel({
        source: source,
        userId: req.user.id,
        status: "compiling",
    });
    
    strategy.save((err: any, result: IStrategy) => {
        if (err) {
            res.status(500).json({
                message: "Database error."
            });
            throw err;
        }
        
        res.status(200).json({
           message: "Strategy was sended to compilation." 
        });
        compileStrategy(result);
    });
});

import temp = require('temp');
import fs = require('fs');
import cp = require('child_process');
import os = require('os');
import {config} from './config';

function compileStrategy(strategy: IStrategy) {
    var tDir = temp.mkdirSync({});
    console.log(tDir);
    var sourcePath = tDir + "/MyStrategy.java";
    var classPath = tDir + "/MyStrategy.class";
    fs.writeFileSync(sourcePath, strategy.source);
    console.log('files:')
    console.log(fs.readdirSync(tDir));
    var command = config.jdk.binPath + 
        "javac\" -encoding utf8 -implicit:none -sourcepath " + 
        config.strategy.classpath + " MyStrategy.java";
    if(os.type() == 'Windows_NT') {
        command = "chcp 65001 | " + command;
    }
    
    console.log('command:')
    console.log(command);
    cp.exec(command, { cwd: tDir }, (err, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);

        var mess = stderr.toString();
        console.log(`stderr: ` + mess);

        if (err) {
            console.log(err.message)
            strategy.status = "error";
            strategy.errorMessage = mess;
        } else {
            strategy.status = "accepted";
            strategy.class = fs.readFileSync(classPath);
        }
        strategy.save((err) => {
            if (err) {
                console.log("DataBase error: ");
                console.log(err);
            }
        });
        //ifExistRemoveSync(sourcePath);
        //ifExistRemoveSync(classPath);
        //fs.rmdirSync(tDir);
    });
}

function ifExistRemoveSync(path: string) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

function removeDirSync(dirPath: string) {
    fs.readdirSync(dirPath).forEach((name) => {
       var curPath = dirPath + "/" + name;
       if(fs.statSync(curPath).isDirectory) {
           removeDirSync(curPath);
       } else {
           fs.unlinkSync(curPath);
       }
    });
    fs.rmdirSync(dirPath);
}


router.get("/", function(req: Request, res: Response, next) {
    StrategyModel.find({}, {class: 0} , (err: any, strategies: IStrategy[]) => {
        if (err) {
            res.status(500).json({
                message: "Database error."
            });
            throw err;
        }
        res.status(200).json({
            message: "Finded " + strategies.length + " strategies",
            strategies: strategies
        });
    });
});