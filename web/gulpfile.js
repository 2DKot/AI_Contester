/// <reference path="typings/gulp/gulp.d.ts"/>
/// <reference path="typings/gulp-typescript/gulp-typescript.d.ts"/>
/// <reference path="typings/browserify/browserify.d.ts"/>
/// <reference path="typings/vinyl-source-stream/vinyl-source-stream.d.ts"/>

"use strict";

var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream');
  
gulp.task('build-spa', [], () => {
  let result = browserify('build/spa.js', {bundleExternal: false})
    .bundle()
    .pipe(source('spa.js'))
    .pipe(gulp.dest('dist'));
  return result;
});