const gulp = require('gulp');
const fs = require('fs');

// Keep the global.config above any of the gulp-tasks that depend on it
const projectPackage = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
global.config = {
  build: {
    rootDirectory: 'build',
    bundledDirectory: 'bundled',
    unbundledDirectory: 'unbundled',
    // Accepts either 'bundled', 'unbundled', or 'both'
    // A bundled version will be vulcanized and sharded. An unbundled version
    // will not have its files combined (this is for projects using HTTP/2
    // server push). Using the 'both' option will create two output projects,
    // one for bundled and one for unbundled
    bundleType: 'both'
  },
  // Path to your service worker, relative to the build root directory
  serviceWorkerPath: 'service-worker.js',
  // Service Worker precache options based on
  // https://github.com/GoogleChrome/sw-precache#options-parameter
  swPrecacheConfig: {
    navigateFallback: '/index.html'
  }
};

// Require taks from /gulp-tasks folder
require('require-dir')('./gulp-tasks');

const allBuildTasks = ['build'];

gulp.task('default', gulp.series(['clean', allBuildTasks]));