var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    browsersync = require('browser-sync');

var prefixerOptions = {
    browser: ['last 2 version', 'Android >= 4.0']
};

gulp.task('sass', function () {
    gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', function (error) {
                gutil.log(error);
                this.emit('end');
            }))
            .pipe(autoprefixer())
            .pipe(rename({suffix: '.min'}))
            .pipe(cssmin())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});

gulp.task('w-sass', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('bs', function () {
    browsersync({
        files: ['demo/**/*.html', 'demo/**/*.js','js/**/*.js' ,'css/**/*.css',],
        server: {
            directory: true,
            baseDir: '.'
        },
        port: 7777,
        browser: 'google chrome',
        reloadDelay: 1,
        injectChanges: true
    });
});

gulp.task('default', ['w-sass', 'bs']);