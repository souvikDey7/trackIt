const gulp = require('gulp');

// Define a task for copying assets
gulp.task('copy-assets', function () {
  return gulp.src('src/assets/**/*') // Source files
    .pipe(gulp.dest('dist/assets')); // Destination folder
});

// Default task (replace 'copy-assets' with your actual tasks)
gulp.task('default', gulp.series('copy-assets'));
