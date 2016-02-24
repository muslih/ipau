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


// jshint      = require('gulp-jshint'),
// concat      = require('gulp-concat'),
// imagemin    = require('gulp-imagemin'),
// plumber     = require('gulp-plumber'),
// notify      = require('gulp-notify'),

var config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  publicDir: './public'
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
  return gulp.src('./src/css/style.scss')
  .pipe(plumber(plumberErrorHandler))
  .pipe(sass({
      includePaths: [config.bootstrapDir + '/assets/stylesheets'],
  }))
  .pipe(postcss(processors))
  .pipe(gulp.dest(config.publicDir + '/css'))
  .pipe(notify({title:'Sukses',message:'File css berhasil digabung dan dikompres bos!'}));
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
  .pipe(concat('app.js'))
  .pipe(gulp.dest(config.publicDir+'/js'))
  .pipe(notify({title:'Sukses',message:'File Js berhasil digabung bos!'}));
})

gulp.task('compress',function(){
  return gulp.src(config.publicDir+'/js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest(config.publicDir+'/js'))
  .pipe(notify({title:'Sukses',message:'File Js berhasil dikompres bos!'}));
})

gulp.task('watch',function(){
  gulp.watch('./src/css/style.scss',['css']);
  gulp.watch('./src/js/*.js',['js']);
  gulp.watch(config.publicDir+'/js/app.js',['compress']);
})

gulp.task('default', ['css','fonts','js','compress','watch']);