/// <reference path="typings/gulp/gulp.d.ts"/>
/// <reference path="typings/del/del.d.ts"/>
/// <reference path="typings/gulp-typescript/gulp-typescript.d.ts"/>
/// <reference path="typings/vinyl-source-stream/vinyl-source-stream.d.ts"/>

"use strict";

var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    source = require('vinyl-source-stream'),
    del = require('del');

//TODO automated clean

gulp.task('clean', [], () => {
    del.sync(['dist']);
});

gulp.task('build-app', [], () => {
    let result = gulp
        .src('src/**/*.ts')
        .pipe(ts(ts.createProject('src/tsconfig.json')))
        .js.pipe(gulp.dest('dist'));
    return result;
});

gulp.task('watch',[], () => {
    gulp.watch('src/**/*.ts', () => {
        gulp.start('build-app');
    });
});