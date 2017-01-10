const autoprefixer = require('gulp-autoprefixer')
const blok = require('gulp-blok')
const browserify = require('browserify')
const browserSync = require('browser-sync')
const buffer = require('vinyl-buffer')
const concat = require('gulp-concat')
const fs = require('fs')
const globbing = require('gulp-css-globbing')
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const reload = browserSync.reload
const sass = require('gulp-sass')
const source = require('vinyl-source-stream')
const tsify = require('tsify')
const watch = require('gulp-watch')
const config = require('./config.js')

gulp.task('deploy', function () {
  return gulp.src('./views/**/*')
    .pipe(blok(config.blok))
})

gulp.task('styles', function () {
  return gulp.src('source/styles/**/*.{sass,scss}')
    .pipe(plumber())
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      browsers: config.browsers
    }))
    .pipe(gulp.dest('./views/assets/'))
    .pipe(browserSync.stream());
})

gulp.task('scripts', function () {
  return browserify({
    entries: 'source/scripts/main.ts',
    debug: true
  }).plugin('tsify', {
    noImplicitAny: true,
    target: 'ES5'
  })
    .bundle()
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./views/assets/'))
    .pipe(browserSync.stream());
})

gulp.task('browsersync', function () {
  browserSync({
    port: 4200,
    serveStatic: ['./views'],
    proxy: {
      target: 'https://' + config.blok.domain,
      reqHeaders: function (config) {
        return {
          'accept-encoding': 'identity',
          'agent': false,
          'browsersyncblok': true
        }
      }
    },
    https: fs.existsSync('./cert.js') ? require('./cert') : false,
    reloadDelay: 1000,
    notify: true,
    open: true,
    logLevel: 'silent'
  })

  gulp.watch('views/**/*.liquid').on('change', reload)
  gulp.watch('source/styles/**/*.scss', ['styles'])
  gulp.watch('source/scripts/**/*.ts', ['scripts'])
})

gulp.task('default', ['styles', 'scripts', 'browsersync'], function () {
  return watch('./views/**/*')
    .pipe(blok(config.blok))
})
