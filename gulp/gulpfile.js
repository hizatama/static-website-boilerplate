(function() {

  var
  gulp         = require("gulp"),
  gulputil     = require("gulp-util"),
  sass         = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  plumber      = require("gulp-plumber"),
  concat       = require("gulp-concat"),
  connect      = require("gulp-connect"),
  stringify    = require("stringify"),
  browserify   = require("browserify"),
  uglify       = require('gulp-uglify'),
  sourceMaps   = require('gulp-sourcemaps'),
  source       = require('vinyl-source-stream'),
  bulkSass     = require('gulp-sass-bulk-import'),
  minifyCss    = require('gulp-minify-css');

  gulp.task("sass", function() {
    gulp.src("../scss/app.scss")
        .pipe(plumber())
        .pipe(bulkSass())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest("../css"));
  });

  gulp.task('js', function() {
    // example
    // - sources
    // js
    // ├app
    // │└foo.js
    // └lib
    //  ├jquery-1.18.11.min.js
    //  └jquery.bar.js
    //  
    // - output
    // js
    // └app.min.js
    gulp.src([
          '../js/lib/*.js',
          '../js/app/*.js'])
        .pipe(plumber())
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('../js/'));
  });


  gulp.task("connect", function(){
    connect.server({
      root: "../",
      livereload: true
    });
  });

  gulp.task("reload", function(){
    connect.reload();
  });

  gulp.task("watch", function() {
    gulp.watch("../scss/**/*.scss", ["sass", "reload"]);
    gulp.watch("../**/*.html", ["reload"]);

    // Uncomment when if you use app.min.js
    // gulp.watch(["../js/app/*.js", "../js/lib/*.js"], ["js", "reload"]);
  });
  gulp.task('default', ['sass', 'connect', 'watch']);

  // Uncomment when if you use app.min.js
  // gulp.task('default', ['sass', 'js', 'connect', 'watch']);

}).call(this);
