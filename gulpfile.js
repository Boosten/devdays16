var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ngConstant = require('gulp-ng-constant');

var paths = {
  sass: ['./scss/**/*.scss']
};

var environments = {
  // Let the Ionic proxy settings handle the request to the actual api --> see ionic.config.json for the proxy url
  "dev": {
    "APPSETTINGS": {
      "BASEURL": "/api"
    }
  },
  // Use a absolute url for our requests
  "prod": {
    "APPSETTINGS": {
      "BASEURL": "http://qnh-events.azurewebsites.net/api"
    }
  }
};

gulp.task('default', ['sass']);

/******* Generate the appropriate constants based on ionic command (serve vs build) *******/

// start some tasks on serve command (the gulpStartupTasks in the ionic.config.json file don't work properly anymore with the Ionic CLI 2.0.0)
gulp.task('serve:before', ['constants:dev', 'sass', 'watch']);

// generate the constants file with the production settings
gulp.task('build:before', ['constants:prod']);
gulp.task('run:before', ['constants:prod']);

gulp.task('constants:dev', function () {
  return ngConstant({
    name: 'devdays.settings',
    constants: environments.dev,
    stream: true
  }).pipe(gulp.dest('./www/js'));
});

gulp.task('constants:prod', function () {
  return ngConstant({
    name: 'devdays.settings',
    constants: environments.prod,
    stream: true
  }).pipe(gulp.dest('./www/js'));
});

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(gulp.dest('./www/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
      .on('log', function (data) {
        gutil.log('bower', gutil.colors.cyan(data.id), data.message);
      });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
        '  ' + gutil.colors.red('Git is not installed.'),
        '\n  Git, the version control system, is required to download Ionic.',
        '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
        '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
