/**
 * 监视JS和CSS文件，刷新浏览器
 * Created at 2018/3/29 09:19
 * Author esinger (Weibo: http://weibo.com/esinger Wechat: esinger)
 * Copyright pinfankeji.com
 */

const gulp = require('gulp')
const concat = require('gulp-concat')
const sync = require('browser-sync')
const moment = require('moment')

const srcDir = './src'
const distDir = './dist'
const staticDir = './dist/static'
const htmlDir = './dist/html'

const outDir = './out'

const jsSrcFiles = srcDir + '/js/*.js'
const cssSrcFiles = srcDir + '/css/*.css'

// 处理CSS
gulp.task('css', function () {
    gulp.src(cssSrcFiles)
        .pipe(concat('all.css'))
        .pipe(gulp.dest(staticDir + '/css'))
})

// 处理JS
gulp.task('js', function () {
    gulp.src(jsSrcFiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(staticDir + '/js'))
})

// 监视文件
gulp.task('watch', ['js', 'css'], function () {

    // 监视CSS源文件
    gulp.watch(cssSrcFiles, ['css'])

    // 监视JS源文件
    gulp.watch(jsSrcFiles, ['js'])

    // 监视静态文件
    gulp.watch(staticDir + '/*/*.*').on('change', sync.reload)

    // 监视HTML文件
    gulp.watch(htmlDir + '/*/*.html').on('change', sync.reload)
})

// 服务器
gulp.task('server', function () {
    sync.init({
        server: {
            baseDir: distDir
        }
    })
})

// 导出文件夹
gulp.task('out', function () {
    let dirName = 'dist_' + moment().format('YYYYMMDD_hhmmss')
    gulp.src(distDir + '/**/*')
        .pipe(gulp.dest(outDir + '/' + dirName))
})

// 开发模式
gulp.task('dev', ['server', 'watch'])

// 默认任务
gulp.task('default', function () {
    console.log('npm run dev')
})