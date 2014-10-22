var gulp = require('gulp');
var browserify = require('gulp-browserify');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var react = require('gulp-react');
var reactify = require('reactify');


var SRC = './src';
var BUILD = './build';
var APP_MAIN = SRC + '/index.js';


gulp.task('js', function() {
	gulp
		.src(APP_MAIN)
		.pipe(plumber())
		.pipe(browserify({
			// insertGlobals: true,
			debug: !gulp.env.production,
			transform: [reactify]
		}))
		.pipe(gulp.dest(BUILD));
});

gulp.task('lint', function() {
	gulp
		.src(SRC + '/**')
		.pipe(react())
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
	gulp.watch(SRC + '/**', ['lint', 'js']);
});

gulp.task('default', ['watch', 'lint', 'js', ]);