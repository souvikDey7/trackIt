const gulp = require('gulp');

// Example: Copy assets
gulp.task('copy-assets', function () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});


const fs = require('fs');

gulp.task('process-styles', function (done) {
  const stylesPath = 'src/styles/**/*.css';
  if (!fs.existsSync('src/styles')) {
    console.log('No styles directory found. Skipping task.');
    return done();
  }
  return gulp.src(stylesPath)
    .pipe(gulp.dest('dist/styles'));
});

  

// Define the `build` task
gulp.task('build', gulp.series('copy-assets', 'process-styles'));
