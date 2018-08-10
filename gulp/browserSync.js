let browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const runSequence = require('run-sequence');

module.exports = function(gulp, $) {

	return {
		default: () => {

			browserSync.init({
				proxy: '127.0.0.1:8000',
				files: ['public/**/*.*'],
				browser: 'google chrome',
			});

			gulp.watch('./src/css/**/**/*.scss', ['sass']);
			watch('./public/assets/svgs/**/*.svg', () => {
				runSequence('svgs-to-json');
			});
		},
	};
};
