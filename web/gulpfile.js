/// <reference path="typings/gulp/gulp.d.ts"/>
/// <reference path="typings/del/del.d.ts"/>
/// <reference path="typings/gulp-sourcemaps/gulp-sourcemaps.d.ts" />
/// <reference path="typings/source-map-support/source-map-support.d.ts" />
/// <reference path="typings/gulp-typescript/gulp-typescript.d.ts"/>
/// <reference path="typings/browserify/browserify.d.ts"/>
/// <reference path="typings/vinyl-source-stream/vinyl-source-stream.d.ts"/>

"use strict";

var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    exec = require('child_process').execSync,
    sourcemaps = require('gulp-sourcemaps');

require('source-map-support').install();

//TODO automated clean

gulp.task('clean', [], () => {
    del.sync(['build', 'dist']);
});

gulp.task('compile-src', [], () => {
    let result = gulp
        .src('src/app/*.{ts,tsx}')
        .pipe(sourcemaps.init())
        .pipe(ts(ts.createProject('src/tsconfig.json')))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
        .pipe(gulp.dest('build'));
    return result;
});

gulp.task('compile-server', [], () => {
    let result = gulp
        .src('src/server.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(ts.createProject('src/tsconfig.json')))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
        .pipe(gulp.dest('dist'));
    return result;
});

gulp.task('through', [], () => {
    let result = gulp
        .src('src/index.html')
        .pipe(gulp.dest('dist/app'));
    return result;
});

gulp.task('copy-images', [], () => {
    let result = gulp
        .src('src/img/*')
        .pipe(gulp.dest('dist/app/img'));
    return result;
});

gulp.task('browserify', ['compile-src'], () => {
    let result = browserify('build/app/app.js', { bundleExternal: false })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/app/js'));
    return result;
});

gulp.task('build-app', ['compile-server', 'through', 'browserify', 'copy-images']);

gulp.task('watch',[], () => {
    gulp.watch(['src/**/*.{ts,tsx}', 'src/index.html'], () => {
        gulp.start('build-app');
    });
});
