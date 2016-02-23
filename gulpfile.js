require('es6-promise').polyfill()

var gulp          = require('gulp');
var postcss       = require('gulp-postcss');
var sass          = require('gulp-sass');
var csswring      = require('csswring');
var autoprefixer  = require('autoprefixer');

var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    publicDir: './public',
};

gulp.task('css', function() {
    var processors = [
      csswring,
      autoprefixer({browsers:['last 2 version']})
    ];
    return gulp.src('./src/css/style.scss')
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

// gulp.task('watch',function(){
//   livereload.listen();
//   gulp.watch('css/src/*.scss'),['sass']);
//   gulp.watch('js/src/*.js',['js']);
//   gulp.watch('img/src/*.{png,jpg,gif}',['img']);
// })


gulp.task('watch',function(){
  gulp.watch('./src/css/style.scss',['css'])
})

// gulp.task('default',['sass','js','img','watch'])

gulp.task('default', ['css', 'fonts','watch']);

// gulp.task('watch:styles',function(){
//   gulp.watch('**/*.css',['styles']);
// })