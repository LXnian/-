const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
// const sass1 = require('sass')
// const gulpsass = require('gulp-sass')
// const sass = // gulpsass(sass1)
const sass = require('gulp-sass')(require('sass'))
const gulpbabel = require('gulp-babel')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const clean = require('gulp-clean')
const webserver = require('gulp-webserver')

/**
 * css任务
 *    1. 打包css样式到dist目录 
 *    2. 压缩css文件
 */
gulp.task('css', function () {
    return gulp.src('./src/css/**')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
})

/**
 * sass任务
 *   1. sass -> css
 *   2. 压缩
 *   3. 拷贝到dist/css
 */
gulp.task('sass', function () {
    return gulp.src('./src/sass/**')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
})

/**
 * js任务
 *   1. es6新语法处理
 *    
 *   2. 压缩
 */
gulp.task('js',function(){
    return gulp.src('./src/js/**')
               .pipe(gulpbabel({presets:['es2015']}))
               .pipe(uglify())
               .pipe(gulp.dest('./dist/js/'))
})

/**
 * html任务
 *   1.压缩
 */
gulp.task('html',function(){
    return gulp.src('./src/pages/**')
              .pipe(htmlmin({removeEmptyAttributes:true,collapseWhitespace:true}))
              .pipe(gulp.dest('./dist/pages/'))
})

/**
 * 静态资源 static
 */
gulp.task('static',function(){
    return gulp.src('./src/static/**')
               .pipe(gulp.dest('./dist/static/'))
})
/**
 * 第三方文件 lib
 */
gulp.task('lib',function(){
    return gulp.src('./src/lib/**')
               .pipe(gulp.dest('./dist/lib/'))
})

/**
 * 清除dist目录
 */
gulp.task('clean',function(){
    return gulp.src('./dist',{allowEmpty:true})
               .pipe(clean())
})

/**
 * webserver
 *   加载dist目录下资源运行
 */
gulp.task('webserver',function(){
    return gulp.src('./dist')
               .pipe(webserver({
                   host:'localhost',
                   port: 3000,
                   livereload:true,
                   open:'./pages/index.html'
               }))
})

/**
 * 侦听任务
 */
gulp.task('watch',function(){
    gulp.watch('./src/css/**', gulp.series('css'))
    gulp.watch('./src/sass/**', gulp.series('sass'))
    gulp.watch('./src/js/**', gulp.series('js'))
    gulp.watch('./src/pages/**', gulp.series('html'))
    gulp.watch('./src/static/**', gulp.series('static'))
    gulp.watch('./src/lib/**', gulp.series('lib'))
})

/**
 * 按顺序执行任务
 */
gulp.task('series',gulp.series('css','sass','js','html','static','lib'))

/**
 * 默认任务
 */
exports.default = gulp.series('clean',gulp.parallel('css','sass','js','html','static','lib'), 'webserver','watch')

