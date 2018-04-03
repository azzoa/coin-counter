const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglifyCSS = require('gulp-uglifycss');
const uglifyJS = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin')

gulp.task('serve', () => {
    browserSync.init({
        server: "./dist",
        notify: "false"
    });

    gulp.watch("src/scss/main.scss", ['sass']);
    gulp.watch("src/css/**/*.css", ['minifyCSS']);
    gulp.watch("src/js/**/*.js", ['scripts']);
    gulp.watch("src/*.html", ['minifyHTML']);
    gulp.watch("dist/*.html").on('change', browserSync.reload)
    gulp.watch("dist/js/**/*.js").on('change', browserSync.reload)
    gulp.watch("dist/css/**/*.css").on('change', browserSync.reload)

});

gulp.task('sass', () => {
    return gulp.src("src/scss/main.scss")
      .pipe(sass().on('error', sass.logError))
      .pipe(rename("style.css"))
      .pipe(gulp.dest("src/css/"))
      .pipe(browserSync.stream());
  });

gulp.task('minifyCSS', () => {
    gulp.src('./src/css/**/*.css')
      .pipe(uglifyCSS({
        "maxLineLen": 80,
        "uglyComments": true
      }))
      .pipe(gulp.dest('./dist/css/'));
});

gulp.task("scripts", () => {
    return gulp.src("src/js/**/*.js")
        // .pipe(babel({
        //     presets: ['env']
        // }))
        .pipe(uglifyJS(/* options */))
        .pipe(gulp.dest("dist/js/"))
});
gulp.task('minifyHTML', () =>{
    return gulp.src('src/*html')
      .pipe(htmlmin({
          collapseWhitespace: true
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minifyHTML','sass','serve']);
