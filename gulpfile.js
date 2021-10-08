'use strict';

const gulp = require('gulp'),
    plugLoader = require('gulp-load-plugins')(),
    sprite = require('gulp-svg-sprite'),
    browserSync = require('browser-sync').create(),
    nunjucks = require('gulp-nunjucks-render');

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });    
});

function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
}

gulp.task('nunjucks', function(){
    return gulp.src('src/pages/*.njk')
        .pipe(plugLoader.data(function() {
            return requireUncached('./src/pages/data.json')
        }))
        .pipe(nunjucks({
            path: ['src/templates'],
        }))
        .pipe(plugLoader.beautify.html({ indent_size: 2 }))
        .pipe(gulp.dest('build'))
        .on('end', browserSync.reload);
});

gulp.task('scss', function(){
    return gulp.src('src/static/scss/*.scss')
        .pipe(plugLoader.sourcemaps.init())
        .pipe(plugLoader.sass())
        .pipe(plugLoader.autoprefixer({
            cascade: false
        }))
        .on("error", plugLoader.notify.onError({
            message: "Error: <%= error.message %>",
            title: "style error"
          }))
        .pipe(plugLoader.csso({
            restructure: false,
            sourceMap: true,
            debug: false
        }))
        .pipe(plugLoader.sourcemaps.write())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', function(){
    return gulp.src('src/static/js/**/*.js')
        .pipe(plugLoader.babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('build/js'))
        .on('end', browserSync.reload);
});

//image-processing

gulp.task('svgmin', function() {
    return gulp.src('src/static/img/**/*.svg')
        .pipe(plugLoader.svgmin())
        .pipe(gulp.dest('build/img/svg-min'));
});

gulp.task('sprite', function () {
    return gulp.src('build/img/svg-min/**/*.svg')
        .pipe(sprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"
                    }
                },
            }
        ))
        .pipe(gulp.dest('build/img/'));
});

gulp.task('webp', function() {
    return gulp.src('src/static/img/**/*.*')
        .pipe(plugLoader.webp())
        .pipe(gulp.dest('build/img'));
});

gulp.task ('images', function(){
    return gulp.src('src/static/img/**/*.*')
        .pipe(plugLoader.imagemin())
        .pipe(gulp.dest('build/img'));
})

gulp.task('watch', function(){
    gulp.watch('src/**/*.njk', gulp.series('nunjucks'));
    gulp.watch('src/static/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/static/js/*.js', gulp.series('scripts'));
    gulp.watch('src/static/img/*.*', gulp.series('images'));
});

gulp.task('default', gulp.series(
    gulp.parallel('nunjucks', 'scss', 'scripts', 'images'),
    gulp.parallel('watch', 'serve')
));