/// <reference path="../../typings/tsd.d.ts" />
"use strict";

import mongoose = require('mongoose');

var uristring = 'mongodb://localhost/test';

export var connection = mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});
