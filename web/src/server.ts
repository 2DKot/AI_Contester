/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/connect/connect.d.ts"/>
/// <reference path="../typings/serve-static/serve-static.d.ts"/>
/// <reference path="../typings/source-map-support/source-map-support.d.ts"/>

import * as Connect from 'connect';

var connect = require('connect'),
    serveStatic = require('serve-static');

require('source-map-support').install();

var app: Connect.Server = connect();

app.use(serveStatic(__dirname + "/app"));
app.use('/lib/react', serveStatic("node_modules/react/dist/"));
app.use('/lib/react', serveStatic("node_modules/react-dom/dist/"));
app.use('/lib/fetch', serveStatic("node_modules/whatwg-fetch/"));
app.use('/config', serveStatic("config/"));
app.listen(8080, function() {
    console.log("Front-end server is ready! And listen on 8080.");
});
