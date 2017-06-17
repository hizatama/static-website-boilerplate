/* ===== Settings ===== */
const
    DIST_DIR = '../dist',
    DIST_CSS = '../dist/css/',
    DIST_JS  = '../dist/js/',
    SRC_DIR  = '../src/',
    SRC_SASS = '../src/scss/',
    SRC_JS   = '../src/js/';

const
    DIST_JS_FILE = 'app.min.js',
    DIST_CSS_FILE = 'app.min.css';

/* ===== Requires ===== */
let gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    connect      = require('gulp-connect'),
    uglify       = require('gulp-uglify'),
    sourceMaps   = require('gulp-sourcemaps'),
    bulkSass     = require('gulp-sass-bulk-import'),
    cleanCss     = require('gulp-clean-css');

/* ======= Tasks ======= */
/* -- Build tasks -- */
gulp.task('build', ['build:scss', 'build:js']);
gulp.task('build:scss', ()=>{
  return gulp.src([SRC_SASS+'app.scss'])
      .pipe(plumber())
      .pipe(bulkSass())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCss())
      .pipe(rename({
        basename:DIST_CSS_FILE,
        extname:''
      }))
      .pipe(gulp.dest(DIST_CSS));
});

gulp.task('build:js', ()=>{
  return gulp.src([
        SRC_JS+'lib/*.js',
        SRC_JS+'app/*.js'])
      .pipe(sourceMaps.init())
      .pipe(plumber())
      .pipe(uglify({preserveComments: 'some'}))
      .pipe(concat(DIST_JS_FILE))
      .pipe(sourceMaps.write('./'))
      .pipe(gulp.dest(DIST_JS));
});


/* -- Local server tasks -- */
gulp.task('connect', ()=>{
  connect.server({
    root: DIST_DIR,
    livereload: true
  });
});

gulp.task('reload', ()=>{
  connect.reload();
});

/* -- Watch tasks -- */
gulp.task('watch', ()=>{
  gulp.watch(SRC_SASS+'**/*.scss', ['build:scss', 'reload']);
  gulp.watch(DIST_DIR+'**/*.html', ['reload']);
  gulp.watch(SRC_JS+'**/*.js', ['build:js', 'reload']);
});

/* -- Other tasks -- */
gulp.task('default', ['build:scss', 'build:js', 'connect', 'watch']);

