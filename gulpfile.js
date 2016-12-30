var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('fonts', function () {
    return gulp.src(['bower_components/materialize/dist/fonts/roboto/*'])
        .pipe(gulp.dest('web/fonts/'))
});

gulp.task('less', function() {
    return gulp.src([
        'web-src/css/app.less'
    ])
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('web/css/'));
});

gulp.task('build-materialize', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/materialize/dist/js/materialize.min.js'
    ])
        .pipe(babel({compact: true}))
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('web/js'));
});

gulp.task('build', function () {
    return browserify(
        {
            entries: './web-src/js/main.js',
            extensions: ['.js'],
            debug: true
        })
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('web/js/main'));
});

gulp.task('fonts', function () {
    return gulp.src(['bower_components/materialize/dist/fonts/roboto/*'])
        .pipe(gulp.dest('web/fonts/'))
});

gulp.task('watch', ['build', 'less'], function () {
    gulp.watch('web-src/css/*.less', ['less']);
    gulp.watch('web-src/css/**/*.less', ['less']);
    gulp.watch('web-src/js/**/*.js', ['build']);
});

gulp.task('default', ['watch']);