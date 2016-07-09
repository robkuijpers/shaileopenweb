// ************************************************************************
// Rob Kuijpers
// June 2016
// ************************************************************************
"use strict";

// To automatically load all plugins use 'gulp-load-plugins':
// const plugins = require('gulp-load-plugins')();  
const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gls = require('gulp-live-server'); 
const autoprefixer = require('gulp-autoprefixer');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const nodemon = require('gulp-nodemon');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const minifyjs = require('gulp-minify');
const minifycss = require('gulp-clean-css');
const filesize = require('gulp-filesize');
const del = require('del');
const tscConfig = require('./tsconfig.json');


// *** Clean the dist folder ***
gulp.task('clean', function() {
    return del(['public/dist']);
});


// *** Compile Generic SASS ***
const sassFiles = ['public/src/styles/**/*.scss'];
const cssDirOut = 'public/dist/styles';

gulp.task('sass:main', function(){
  return gulp.src(sassFiles)
    .pipe(sass()) 
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(filesize())
    .pipe(minifycss())
    .pipe(gulp.dest(cssDirOut))
    .pipe(filesize());
});

// *** Compile App SASS ***
const sassMainFile = 'public/src/styles/main.scss';
const sassComponentFiles = 'public/src/scripts/**/*.scss';
const cssAppDirOut = 'public/dist/scripts/';

gulp.task('sass:components', function(){
  return gulp.src([sassMainFile, sassComponentFiles])
    .pipe(sass()) 
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(minifycss())
    .pipe(gulp.dest(cssAppDirOut));
});

// *** Lint and compile Typescript to ES5 ***
const typescriptFiles = [
     'public/src/scripts/**/*.ts'        // !!!!!
    ,'typings/index.d.ts'                // !!!!!
  ];
const javascriptDirOut = 'public/dist/scripts';

gulp.task('typescript', function() {
  return gulp
    .src(typescriptFiles)
    .pipe(tslint())
    .pipe(tslint.report('verbose', {emitError: false}))
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(javascriptDirOut));  
});

// *** Lint and compile Typescript unit tests to ES5 ***
const typescriptTestFiles = [
     'public/test/**/*.ts'        // !!!!!
    ,'typings/index.d.ts'         // !!!!!
  ];
const javascriptTestDirOut = 'public/test';

gulp.task('typescript:test', function() {
  return gulp
    .src(typescriptTestFiles)
    .pipe(tslint())
    .pipe(tslint.report('verbose', {emitError: false}))
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(javascriptTestDirOut));  
});

// *** Optimize images ***
const imageFiles = 'public/src/images/*';
const imageDirOut = 'public/dist/images';

gulp.task('imagemin', function() {
  return gulp.src(imageFiles)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(imageDirOut));
});


// *** Copy Material Design Roboto font and Material Design icon font  ***
const fontFilesRoboto = 'node_modules/roboto-font/fonts/Roboto/roboto-*.*';
const fontFilesIcons = 'node_modules/material-design-icons/iconfont/*.*';
const fontsDirOut = 'public/dist/fonts';

gulp.task('copy:fonts', function() {
  
  gulp.src('node_modules/roboto-font/css/fonts.css')
    .pipe(gulp.dest('public/dist/styles'));  

  gulp.src(fontFilesRoboto)
    .pipe(gulp.dest(fontsDirOut + '/roboto')); 

  return gulp.src(fontFilesIcons)
    .pipe(gulp.dest(fontsDirOut + '/material-icons'));

});


// *** Copy runtime dependencies ***
const libsDirOut = 'public/dist/libs';

gulp.task('copy:libs', function() {

   gulp.src([      
          'node_modules/core-js/client/shim.min.js',   // Always loaded in the footer.
          'node_modules/zone.js/dist/zone.js',         // Always loaded in the footer.
          'node_modules/reflect-metadata/Reflect.js',  // Always loaded in the footer.
          'node_modules/systemjs/dist/system.src.js']) // Always loaded in the footer.
        .pipe(gulp.dest(libsDirOut + '/angular2'));

    gulp.src('node_modules/@angular/**/*')
        .pipe(gulp.dest(libsDirOut + '/@angular'));

    return gulp.src('node_modules/@angular2-material/**/*')
        .pipe(gulp.dest(libsDirOut + '/@angular2-material'));

    // For now use the nodejs json api.
    // gulp.src('node_modules/angularfire2/*.js')
    //     .pipe(gulp.dest(libsDirOut + '/angularfire2'));

    // gulp.src('node_modules/firebase/*.js')
    //     .pipe(gulp.dest(libsDirOut + '/firebase'));

});

// *** Copy app files ***
const appFiles = ['public/src/*.js'];

gulp.task('copy:app', function() {
  return gulp.src(appFiles)
    .pipe(gulp.dest('public/dist'));
});

const templateFiles = ['public/src/scripts/**/*.html'];

gulp.task('copy:templates', function() {
  return gulp.src(templateFiles)
    .pipe(gulp.dest('public/dist/scripts'));
});

// *** Minify js and css ***
gulp.task('minify:js', function(){
  gulp.src(javascriptDirOut + '/**/*.js')
      .pipe(minifyjs({
          ext:{
              src:'.js',
              min:'.min.js'
          },
          exclude: [],
          ignoreFiles: []
      }))
      .pipe(gulp.dest(javascriptDirOut));
});


// *** Watch files and process on the fly ***
gulp.task('watch', function() {
  gulp.watch(sassFiles, ['sass:main']).on('change', browserSync.reload); 
  gulp.watch(sassComponentFiles, ['sass:components']).on('change', browserSync.reload); 
  gulp.watch(typescriptFiles, ['typescript']).on('change', browserSync.reload);
  gulp.watch(appFiles, ['copy:app', 'copy:libs']).on('change', browserSync.reload); 
  gulp.watch(templateFiles, ['copy:templates']).on('change', browserSync.reload);  
  gulp.watch(imageFiles, ['imagemin']).on('change', browserSync.reload);
  gulp.watch(['*.json', '*.js'], ['default']).on('change', browserSync.reload);
});

// *** Watch files and process on the fly ***
gulp.task('watch:test', function() {
  gulp.watch(typescriptTestFiles, ['typescript:test']);
});


// *** Browser-sync ***
gulp.task('browser-sync', function() {
  browserSync.emitter.on("init", function () {
    console.log("Browsersync is running!");
  });
	browserSync.init(null, {
		proxy: 'https://localhost:3000',
        files: ['public/dist/**/*.*', 'server/**/*.*'],
        open: false,
        port: 7000,
	});
});


// *** Start nodemon for auto reload server files ****
// *** In debug mode, app stops at first statement, attach in VS and play.
gulp.task('server', function() {
  nodemon({
    script: './bin/www',
    ext: 'js hbs',
    watch: ['server'],
    //nodeArgs: ['--debug-brk=5858'],
    env: { 'NODE_ENV': 'development', 'DEBUG': 'shaileopenweb:*' }
  }).on('start', function() {
    console.log('Starting node...');
  }).on('restart', function() {
    console.log('Restarting node...');
    browserSync.reload();
  });
});

// *** Live server for running jasmine unit tests in the browser ***
// Open http://localhost:8080/public/test/unit-tests.html
gulp.task('liveserver', function() {
  const server = gls.static(['.'], 8080);
  server.start().then(function(result) {
    console.log('Live server started for testing.');
  });  
});

// *** Default task ***
gulp.task('default', ['clean'], function() {
    gulp.start('sass:main', 'sass:components', 'typescript', 'imagemin', 'copy:app', 'copy:templates', 'copy:libs', 'copy:fonts', 'browser-sync', 'watch');
});

// *** Test task ***
gulp.task('test', [], function() {
    gulp.start('typescript:test', 'liveserver', 'watch:test');
});

// *** Dist task ***
gulp.task('dist', ['clean'], function() {
    gulp.start('sass:main', 'sass:components', 'typescript', 'imagemin', 'copy:app', 'copy:templates', 'copy:libs', 'copy:fonts', 'minify:js', 'browser-sync', 'watch');
});
