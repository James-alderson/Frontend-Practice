// Initialize modules
const { src, dest, watch, series, parallel } = require("gulp")

// Import packages
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const replace = require("gulp-replace")
const browser_sync = require("browser-sync").create()

// Files path
const files = {
  cssPath: "src/css/*.css"
}

/* Css task
    1. Add vendor prefixes
    2. Minify css
============ */
function css_task() {
  return src(files.cssPath)
    .pipe(postcss([autoprefixer("last 4 versions"), cssnano()]))
    .pipe(dest("dist/css"))
}

/* CopyImage task */
function copyImage_task() {
  return src(["src/images/favicon/*"], { "base": "src/images" })
    .pipe(dest("dist/images"))
}

// Chachebust task
function chachebust_task() {
  let timeString = new Date().getTime()

  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + timeString))
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
  watch([files.cssPath], series(parallel(css_task), chachebust_task))
}

// Gulp watch task
function watch_task() {
  watch([files.cssPath], series(parallel(css_task), chachebust_task))
}

// Gulp default task
exports.default = series(parallel(css_task), chachebust_task, copyImage_task, watch_task)

// Run browserSync
exports.bs = series(parallel(css_task), chachebust_task, copyImage_task, browserSync, BrowserSyncWathc)
