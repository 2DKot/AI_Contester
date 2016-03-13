/// <reference path="../typings/tsd.d.ts" />
"use strict";

import fs = require('fs');

interface RawStrategy {
    sourcepath: string;
    relativePath: boolean;
}

interface RawConfig {
    strategy: RawStrategy;
}

class Strategy {
    classpath: string;
    constructor(conf: RawStrategy) {
        var prefix = "";
        if(conf.relativePath) {
            prefix = process.cwd() + "\\";
        }
        this.classpath = prefix + conf.sourcepath;
    }
}

class Config {
    strategy: Strategy;
    
    constructor(filename: string){
        var raw = JSON.parse(fs.readFileSync(filename, "utf8")) as RawConfig;
        this.strategy = new Strategy(raw.strategy);
    }
}

export var config = new Config("config.json");