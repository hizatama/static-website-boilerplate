/* ===== Settings ===== */
var
    DIST_DIR     = '../dist',
    DIST_CSS     = '../dist/css/',
    DIST_JS      = '../dist/js/',
    DIST_JS_APP  = '../dist/js/page/',
    SRC_DIR      = '../src/',
    SRC_HTML     = '../src/html/',
    SRC_SASS     = '../src/sass/',
    SRC_JS       = '../src/js/',
    SRC_JS_APP   = '../src/js/page/',
    SRC_JS_COMMON= '../src/js/common/';

var
    DIST_JS_COMMON = 'common.js',
    DIST_JS_LIBS   = 'libs.js',
    DIST_CSS_APP   = 'app.css',
    DIST_CSS_LIBS  = 'libs.css';

/* ===== Requires ===== */
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    concat       = require('gulp-concat'),
    rename       = require('gulp-rename'),
    connect      = require('gulp-connect'),
    connectSSI   = require('gulp-connect-ssi'),
    uglify       = require('gulp-uglify'),
    sourceMaps   = require('gulp-sourcemaps'),
    bulkSass     = require('gulp-sass-bulk-import'),
    pleeease     = require('gulp-pleeease'),
    sassImporter = require('node-sass-package-importer'),
    cleanCss     = require('gulp-clean-css'),
    htmlBeautify = require('gulp-html-beautify'),
    htmlExtend   = require('gulp-html-extend');

/* ======= Tasks ======= */
/* -- Build tasks -- */
gulp.task('build', ['build:sass', 'build:js', 'build:html']);
gulp.task('build:sass', function(){
  gulp.src([SRC_SASS+'app.scss'])
      .pipe(plumber())
      .pipe(bulkSass())
      .pipe(sass({
        importer: sassImporter({
          extensions: ['.scss', '.css']
        })
      }))
      .pipe(pleeease({
        sass: true,
        mqpacker: true
      }))
      .pipe(autoprefixer())
      .pipe(cleanCss({format: 'beautify'}))
      .pipe(rename({
        basename:DIST_CSS_APP,
        extname:''
      }))
      .pipe(gulp.dest(DIST_CSS));

  gulp.src([SRC_SASS+'lib.scss'])
      .pipe(plumber())
      .pipe(bulkSass())
      .pipe(sass({
        importer: sassImporter({
          extensions: ['.scss', '.css']
        })
      }))
      .pipe(pleeease({
        sass: true,
        mqpacker: true
      }))
      .pipe(autoprefixer())
      .pipe(cleanCss({format: 'keep-breaks'}))
      .pipe(rename({
        basename:DIST_CSS_LIBS,
        extname:''
      }))
      .pipe(gulp.dest(DIST_CSS));
});

gulp.task('build:js', function(){

  gulp.src([SRC_JS+'lib/*.js'])
      .pipe(plumber())
      .pipe(concat(DIST_JS_LIBS))
      .pipe(gulp.dest(DIST_JS));

  gulp.src([SRC_JS_COMMON+'*.js'])
      // .pipe(sourceMaps.init())
      .pipe(plumber())
      // .pipe(uglify({preserveComments: 'some'}))
      .pipe(concat(DIST_JS_COMMON))
      // .pipe(sourceMaps.write('./'))
      .pipe(gulp.dest(DIST_JS));

  gulp.src([SRC_JS_APP+'*.js'])
      // .pipe(sourceMaps.init())
      // .pipe(plumber())
      // .pipe(uglify({preserveComments: 'some'}))
      // .pipe(concat(DIST_JS_APP))
      // .pipe(sourceMaps.write('./'))
      .pipe(gulp.dest(DIST_JS_APP));
});

gulp.task('build:html', function(){
    return gulp.src([SRC_HTML+'page/**/*.html'])
        .pipe(htmlExtend({annotations:false, verbose:true}))
        .pipe(htmlBeautify({indentSize: 4, indent_with_tabs: true}))
        .pipe(gulp.dest(DIST_DIR));
});

/* -- Local server tasks -- */
gulp.task('connect', function(){
  connect.server({
    root: DIST_DIR,
    port: 8080,
    // livereload: true,
	middleware: function(){
		return [connectSSI({
			baseDir: DIST_DIR,
			ext: '.html',
			// domain: 'http://localhost:8080',
			method: 'readOnLineIfNotExist'  // readOnLine|readLocal|readOnLineIfNotExist|downloadIfNotExist
		})];
	}
  });
});

gulp.task('reload', function(){
  connect.reload();
});

/* -- Watch tasks -- */
gulp.task('watch', function(){
  gulp.watch(SRC_SASS+'**/*.scss', ['build:sass', 'reload']);
  gulp.watch(SRC_HTML+'**/*.html', ['build:html']);
  gulp.watch(SRC_JS+'**/*.js', ['build:js', 'reload']);
});

/* -- Other tasks -- */
gulp.task('default', ['build', 'connect', 'watch']);

