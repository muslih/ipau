require('es6-promise').polyfill()

var gulp            = require('gulp');
var nunjucksRender  = require('gulp-nunjucks-render');
var htmlmin         = require('gulp-htmlmin');
var postcss         = require('gulp-postcss');
var sass            = require('gulp-sass');
var csswring        = require('csswring');
var autoprefixer    = require('autoprefixer');
var notify          = require('gulp-notify');
var plumber         = require('gulp-plumber');
var jshint          = require('gulp-jshint');
var concat          = require('gulp-concat');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglify');
var browserSync     = require('browser-sync').create();
var reload          = browserSync.reload;

var config = {
  bootstrapDir: './bower_components/bootstrap-sass',
  bootstrapJsDir: './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
  jqueryDir: './bower_components/jquery/dist/jquery.js',
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
  return gulp.src([config.jqueryDir,config.bootstrapJsDir,'./src/js/**/*.js'])
  .pipe(plumber(plumberErrorHandler))
  // .pipe(jshint())
  .pipe( jshint.reporter( 'fail' ))
  .pipe(concat('concat.js'))
  .pipe(gulp.dest('./src/concat'))
  .pipe(rename('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest(config.publicDir+'/js'));
})

gulp.task('ipau', function(){
  return gulp.src('./src/pages/**/*.+(html|ipau)')
  // render template
  .pipe(nunjucksRender({
    path:['./src/templates']
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('app'))
});

gulp.task('watch',function(){
  gulp.watch('./src/css/*.scss',['css']);
  gulp.watch('./src/js/**/*.js',['js']);

  gulp.watch('(./src/templates/*|./src/pages/*)',['ipau']);

  gulp.watch('app/**/**/**').on('change', reload);;
})

gulp.task('serve',['css','fonts','js','watch'],function(){
  browserSync.init({
    open: true,
    port: 8080,
    server: {
      baseDir: "./app"
    }
  });
})

gulp.task('default', ['serve']);



