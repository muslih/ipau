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
  .pipe(jshint())
  .pipe(jshint.reporter('fail'))
  .pipe(plumber(plumberErrorHandler))
  .pipe(concat('app.js'))
  .pipe(gulp.dest(config.publicDir+'/js'))
  .pipe(notify({title:'Sukses',message:'File Js berhasil digabung dan dikompres bos!'}));
})

// gulp.task('watch',function(){
//   livereload.listen();
//   gulp.watch('css/src/*.scss'),['sass']);
//   gulp.watch('js/src/*.js',['js']);
//   gulp.watch('img/src/*.{png,jpg,gif}',['img']);
// })


gulp.task('watch',function(){
  gulp.watch('./src/css/style.scss',['css']);
  gulp.watch('./src/js/*.js',['js']);
})

// gulp.task('default',['sass','js','img','watch'])

gulp.task('default', ['css', 'js','fonts','watch']);

// gulp.task('watch:styles',function(){
//   gulp.watch('**/*.css',['styles']);
// })