// Initialize modules
const { src, dest, watch, series, parallel } = require("gulp")

// Import packages
const sass = require("gulp-sass")(require("sass"))
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const concat = require("gulp-concat")
const terser = require("gulp-terser")
const imagemin = require("gulp-imagemin")
const ttf2woff = require("gulp-ttf2woff")
const replace = require("gulp-replace")
const browser_sync = require("browser-sync").create()

// Files path
const files = {
  scssPath: "src/scss/**/*.scss",
  jsPath: "src/js/**/*.js",
  imagePath: "src/images/**/*",
  fontPath: "src/fonts/**/*.ttf"
}

/* Scss task
    1. Compile scss to css
    2. Add vendor prefixes
    3. Minify css
============ */
function scss_task() {
  return src(files.scssPath, { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer("last 4 versions"), cssnano()]))
    .pipe(dest("dist/css", { sourcemaps: "." }))
}

/* Js task
    1. Unify files
    2. Minify js
========== */
function js_task() {
  return src(files.jsPath)
    .pipe(concat("script.js"))
    .pipe(terser())
    .pipe(dest("dist/js"))
}

/* Image task
    1. Compressing images
============= */
function image_task() {
  return src(files.imagePath)
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 35, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ]).on("error", error => console.log(error)))
    .pipe(dest("dist/images"))
}

/* Font task
    1. Convert ttf format to woff
============ */
function font_task() {
  return src(files.fontPath)
    .pipe(ttf2woff())
    .pipe(dest("dist/fonts"))
}

// Chachebust task
function chachebust_task() {
  let dateString = new Date().getTime()

  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + dateString))
    .pipe(dest("."))
}

// Initialize browserSync
function browserSync(callback) {
  browser_sync.init({
    server: {
      baseDir: "."
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0"
      }
    }
  })
  callback()
}

// Reload browserSync
function browserSyncReload(callback) {
  browser_sync.reload()
  callback()
}

// BrowserSync watch task
function BrowserSyncWathc() {
  watch(["index.html"], browserSyncReload)
  watch([files.scssPath, files.jsPath], series(parallel(scss_task, js_task, font_task), chachebust_task))
}

// Gulp watch task
function watch_task() {
  watch([files.scssPath, files.jsPath], series(parallel(scss_task, js_task, font_task), chachebust_task))
}

// Gulp default task
exports.default = series(parallel(scss_task, js_task, font_task), image_task, chachebust_task, watch_task)

// Run browserSync
exports.bs = series(parallel(scss_task, js_task, font_task), chachebust_task, image_task, browserSync, BrowserSyncWathc)
