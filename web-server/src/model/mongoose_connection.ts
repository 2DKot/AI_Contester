/// <reference path="../../typings/mongoose/mongoose.d.ts"/>

import mongoose = require('mongoose');

var uristring = 'mongodb://localhost/test';

var connection = mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

module.exports = connection;