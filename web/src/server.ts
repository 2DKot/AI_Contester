/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/connect/connect.d.ts"/>
/// <reference path="../typings/serve-static/serve-static.d.ts"/>

var connect = require('connect'),
    serveStatic = require('serve-static');
var app = connect();
app.use(serveStatic(__dirname + "/app"));
app.listen(80);