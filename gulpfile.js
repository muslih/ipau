require('es6-promise').polyfill()

var gulp          = require('gulp');
var postcss       = require('gulp-postcss');
var sass          = require('gulp-sass');
var csswring      = require('csswring');
var autoprefixer  = require('autoprefixer');
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');
var jshint        = require('gulp-jshint');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;

var config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  publicDir: './app'
};

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('css', function() {
  var processors = [
    csswring,
    autoprefixer({browsers:['last 2 version']})
  ];
  return gulp.src('./src/css/main.scss')
  .pipe(plumber(plumberErrorHandler))
  .pipe(sass({
      includePaths: [config.bootstrapDir + '/assets/stylesheets'],
  }))
  .pipe(postcss(processors))
  .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('fonts', function() {
  return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});


gulp.task('js',function(){
  return gulp.src('./src/js/*.js')
  .pipe(plumber(plumberErrorHandler))
  .pipe(jshint())
  .pipe(jshint.reporter('fail'))
  .pipe(gulp.dest(config.publicDir+'/js'));
})


gulp.task('compress',function(){
  return gulp.src(config.publicDir+'/js/main.js')
  .pipe(plumber(plumberErrorHandler))
  .pipe(jshint())
  .pipe(jshint.reporter('fail'))
  .pipe(uglify())
  .pipe(gulp.dest(config.publicDir+'/js'));
})

gulp.task('watch',function(){
  gulp.watch('./src/css/main.scss',['css']);
  gulp.watch('./src/js/*.js',['js']);
  gulp.watch(config.publicDir+'/js/main.js',['compress']);
  gulp.watch("app/**/**/**").on('change', reload);;
})

gulp.task('serve',['css','fonts','js','compress','watch'],function(){
  browserSync.init({
    open: true,
    port: 8080,
    server: {
      baseDir: "./app"
    }
  });
})

gulp.task('default', ['serve']);



