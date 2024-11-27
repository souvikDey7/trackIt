const gulp = require('gulp');

// Example: Copy assets
gulp.task('copy-assets', function () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

// Example: Process styles (optional)
gulp.task('process-styles', function () {
  return gulp.src('src/styles/**/*.css')
    .pipe(gulp.dest('dist/styles'));
});

// Define the `build` task
gulp.task('build', gulp.series('copy-assets', 'process-styles'));
