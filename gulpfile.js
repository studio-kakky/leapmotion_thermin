var gulp = require('gulp');
var del = require('del');
var merge = require('event-stream').merge;
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;
var notify = require("gulp-notify");


gulp.task("clean:dist",function(callback){
    del(['dist']);
    callback();
})

gulp.task("build:termin",['clean:dist'],function(){
    return gulp.src(['src/**/*.js','!src/example/**/*.js'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('termin.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'));
})

gulp.task("build:example",function(){
    return gulp.src(['src/example/**/*.js'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(babel())
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream:true}));
})

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        startPath: 'example/hand.html'
    });
});

gulp.task("watch",function(){
	gulp.watch('./src/**/*.js',['build']);
})

gulp.task("build",function(){
	runSequence(
		'build:termin','build:example'
	);
})

gulp.task("default",function(){
	runSequence(
		"build",'browser-sync','watch'
	)
})
