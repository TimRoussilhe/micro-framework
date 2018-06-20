const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');

function getTask(task, options) {
	return require('./gulp/' + task)(gulp, plugins, options);
}

// gulp.task('browserSync', getTask('browserSync').default);
let browserSync = require('browser-sync').create();

// Static server
gulp.task('browserSync', function() {
	browserSync.init({
		proxy: '127.0.0.1:8000',
		files: ['public/**/*.*'],
		browser: 'google chrome',
	});
});

gulp.task('svgs-to-json', getTask('svgs-to-json'));
gulp.task('sass', getTask('sass'));
gulp.task('copyAssets', getTask('copyAssets'));
gulp.task('imageMin', getTask('imageMin'));

gulp.task('build', () => {
	runSequence('copyAssets', 'imageMin');
});
