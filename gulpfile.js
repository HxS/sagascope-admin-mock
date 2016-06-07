'use strict';

var gulp = require('gulp');
var serve = require('gulp-serve');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var ejs = require('gulp-ejs');
var browserify = require('gulp-browserify');

gulp.task('ejs', function () {
  gulp.src('./src/*.ejs')
    .pipe(ejs({}, {"ext": ".html"}))
    .pipe(gulp.dest('./public'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('scripts', function() {
  gulp.src('./src/js/main.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('watch', function () {
  gulp.watch(['./src/sass/style.scss', './src/sass/**/*.scss'], ['sass']);
  gulp.watch(['./src/*.ejs', './src/templates/*.ejs'], ['ejs']);
  gulp.watch(['./src/js/*.js', './src/js/**/*.js'], ['scripts']);
});

gulp.task('serve', serve('public'));

gulp.task('default', function () {
  gulp.run('ejs');
  gulp.run('sass');
  gulp.run('scripts');
  gulp.run('watch');
  gulp.run('serve');
});
