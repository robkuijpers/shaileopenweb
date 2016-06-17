// TODO: Angular 5 min quickstart tutorial in TypeScript.
// TODO: Use Browser-Sync / Or LiveReload for frontend and backend changes.
// TODO: Use Material Design.

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
const livereload = require('gulp-livereload');
const tscConfig = require('./tsconfig.json');
const del = require('del');

// To automatically load all plugins use 'gulp-load-plugins':
// const plugins = require('gulp-load-plugins')();  

const sassFiles = 'public/src/styles/**/*.scss';       // Input
const cssFiles = 'public/dist/styles';                 // Output
const typescriptFiles = 'public/src/scripts/**/*.ts';  // Input
const javascriptFiles = 'public/dist/scripts';         // Output
const imageFilesIn = 'public/src/images';              // Input
const imageFilesOut = 'public/dist/images';            // Output


// *** Clean the dist folder ***
gulp.task('clean', function() {
    return del(['public/dist']);
});


// *** Compile SASS ***
gulp.task('sass', function(){
  return gulp.src(sassFiles)
    .pipe(sass()) 
    .pipe(autoprefixer())
    .pipe(gulp.dest(cssFiles))
    .pipe(livereload());
});


// *** Compile Typescript to ES5 ***
gulp.task('typescript', function() {
  return gulp
    .src(typescriptFiles)
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(javascriptFiles))
    .pipe(livereload());   
});

gulp.task('tslint', function() {
  return gulp.src(typescriptFiles)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});
    
// *** Optimize images ***
gulp.task('images', function() {
  return gulp.src(imageFilesIn)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(imageFilesOut))
    .pipe(livereload());
});

// *** Copy runtime dependencies ***
gulp.task('copy:libs', function() {
  return gulp.src([

    ])
    .pipe(gulp.dest('public/dist/libs'))
});

// *** Watch files and process on the fly ***
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(sassFiles, ['sass']); 
  gulp.watch(typescriptFiles, ['typescript']); 
  gulp.watch(imageFilesIn, ['images']);
});

// *** Start nodemon for auto reload server files ****
gulp.task('server', function() {
  nodemon({
    script: './bin/www',
    ext: 'js hbs',
    nodeArgs: ['--debug-brk=5858'],
    env: { 'NODE_ENV': 'development', 'DEBUG': 'shaileopenweb:*' }
  })
});

// *** Default task ***
gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'typescript', 'images', 'watch');
});