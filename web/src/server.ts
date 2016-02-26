/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/connect/connect.d.ts"/>
/// <reference path="../typings/serve-static/serve-static.d.ts"/>

import * as Connect from 'connect';

var connect = require('connect'),
    serveStatic = require('serve-static');

var app: Connect.Server = connect();

app.use(serveStatic(__dirname + "/app"));
app.use('/lib/react', serveStatic("node_modules/react/dist/"));
app.use('/lib/react', serveStatic("node_modules/react-dom/dist/"));
app.use('/lib/fetch', serveStatic("node_modules/whatwg-fetch/"));
app.listen(80);