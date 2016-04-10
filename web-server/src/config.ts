/// <reference path="../typings/tsd.d.ts" />
"use strict";

import fs = require('fs');

interface RawStrategy {
    sourcepath: string;
    relativePath: boolean;
}

interface RawJdk {
    binPath: string;
}

interface RawConfig {
    strategy: RawStrategy;
    jdk: RawJdk;
}

class Strategy {
    classpath: string;
    constructor(conf: RawStrategy) {
        var prefix = "";
        if(conf && conf.relativePath) {
            prefix = process.cwd() + "\\";
        }
        this.classpath = prefix + conf.sourcepath;
    }
}

class Jdk {
    binPath: string = "\"";
    constructor(conf: RawJdk) {
        if(conf && conf.binPath) {
            this.binPath += conf.binPath;
            if(!this.binPath.endsWith("\\") && !this.binPath.endsWith("/")) {
                this.binPath += "/";
            }
        }
    }
}

class Config {
    strategy: Strategy;
    jdk: Jdk;
    
    constructor(filename: string){
        var raw = JSON.parse(fs.readFileSync(filename, "utf8")) as RawConfig;
        this.strategy = new Strategy(raw.strategy);
        this.jdk = new Jdk(raw.jdk);
    }
}

export var config = new Config("config.json");