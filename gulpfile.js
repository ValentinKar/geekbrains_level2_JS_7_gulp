var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglifyJs = require('gulp-uglifyjs'),
    cssPrefix = require('gulp-autoprefixer'),
    imgMin = require('gulp-imagemin'),
    BS = require('browser-sync');

var config = {
    app: './app',
    dist: './dist'
};

/*
1. gulp.task() - создание новой задачи
2. gulp.src() - позволяет выбрать файлы по шаблону или конкретные файлы
3. gulp.dest() - сохраняет уже преобразованные файлы
4. gulp.watch() - контроль изменений в файлах
 */

gulp.task('test', function () {
    console.log('Gulp works!');
});

gulp.task('default', ['test', 'html', 'sass', 'js', 'json', 'myWatch', 'server'], function () {
    console.log('Task default');
});

gulp.task('html', function () {
    gulp.src([config.app + '/html/index.html'])
        .pipe(gulp.dest(config.dist))
        .pipe(BS.reload({stream:true}));
});

gulp.task('json', function () {
    gulp.src(config.app + '/json/**/*.json')
        .pipe(gulp.dest(config.dist))
        .pipe(BS.reload({stream:true}));
});

gulp.task('sass', function () {
    gulp.src(config.app + '/sass/**/*.sass')
        .pipe(sass())
        .pipe(cssPrefix())
        .pipe(gulp.dest(config.dist + '/css'))
        .pipe(BS.reload({stream:true}));
});

gulp.task('js', function () {
    gulp.src(config.app + '/js/**/*.js')
        .pipe(uglifyJs())
        .pipe(gulp.dest(config.dist + '/js'))
        .pipe(BS.reload({stream:true}));
});

gulp.task('myWatch', function () {
    gulp.watch([config.app + '/html/index.html'], ['html']);
    gulp.watch(config.app + '/sass/**/*.sass', ['sass']);
    gulp.watch(config.app + '/js/**/*.js', ['js']);
    gulp.watch(config.app + '/json/**/*.json', ['json']);
});

//Server
gulp.task('server', function () {
    BS({
        server: {
            baseDir: config.dist
        }
    });
});