// ************************************************************************
// Rob Kuijpers
// June 2016
// ************************************************************************

// To automatically load all plugins use 'gulp-load-plugins':
// const plugins = require('gulp-load-plugins')();  
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
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


// *** Compile SASS ***
const sassFiles = 'public/src/styles/**/*.scss';
const cssDirOut = 'public/dist/styles';

gulp.task('sass', function(){
  return gulp.src(sassFiles)
    .pipe(sass()) 
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(filesize())
    .pipe(minifycss())
    .pipe(gulp.dest(cssDirOut))
    .pipe(filesize());
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
    .pipe(tslint.report('verbose'))
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(javascriptDirOut));  
});


// *** Optimize images ***
const imageFiles = 'public/src/images/*';
const imageDirOut = 'public/dist/images';

gulp.task('imagemin', function() {
  return gulp.src(imageFiles)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(imageDirOut));
});


// *** Copy fonts  ***
// ***** Not used ***** 
const fontFiles = [
         'node_modules/roboto-font/fonts/Roboto/roboto-*.*',
         'node_modules/material-design-lite/fonts/material-design-icons/*.*'
      ];
const fontsDirOut = 'public/dist/fonts';

gulp.task('copy:fonts', function() {
  return gulp.src(fontFiles)
    .pipe(gulp.dest(fontsDirOut));
});


// *** Copy runtime dependencies ***
const libsDirOut = 'public/dist/libs';

gulp.task('copy:libs', function() {
  return gulp.src([
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/material-design-lite/material.min.js',
    ])
    .pipe(gulp.dest(libsDirOut));
});

// *** Copy app files ***
const appFiles = ['public/src/*.js'];

gulp.task('copy:app', function() {
  return gulp.src(appFiles)
    .pipe(gulp.dest('public/dist'));
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
// *** Add other files like systemjs.conf.js ? 
gulp.task('watch', function(){
  gulp.watch(sassFiles, ['sass']).on('change', browserSync.reload); 
  gulp.watch(typescriptFiles, ['typescript']).on('change', browserSync.reload);
  gulp.watch(appFiles, ['copy:app', 'copy:libs']).on('change', browserSync.reload);  
  gulp.watch(imageFiles, ['imagemin']).on('change', browserSync.reload);
  gulp.watch(['*.json', '*.js'], ['default']).on('change', browserSync.reload);
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


// *** Default task ***
gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'typescript', 'imagemin', 'copy:app', 'copy:libs', 'browser-sync', 'watch');
});


// *** Dist task ***
gulp.task('dist', ['clean'], function() {
    gulp.start('sass', 'typescript', 'imagemin', 'copy:app', 'copy:libs', 'minify:js', 'browser-sync', 'watch');
});
