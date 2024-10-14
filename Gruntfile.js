module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Sass compilation task
    sass: {
      dist: {
        options: {
          implementation: require('sass'), // Use Dart Sass
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: './assets/css', // Path to SCSS files
          src: ['*.scss'], // Target all SCSS files in the folder
          dest: './assets/css', // Output folder for CSS
          ext: '.css'
        }]
      }
    },

    // CSS minification task
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './assets/css',
          src: ['*.css', '!*.min.css'], // Minify all CSS files except already minified ones
          dest: './assets/css',
          ext: '.min.css'
        }]
      }
    },

    // Watch task for SCSS changes
    watch: {
      styles: {
        files: ['./assets/css'], // Watch SCSS files
        tasks: ['sass', 'cssmin'], // Compile SCSS and then minify CSS
        options: {
          spawn: false,
          livereload: true // Optional: Live reload browser on changes
        }
      }
    }
  });

  // Load the plugins for tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register the default task to compile SCSS, minify CSS, and watch for changes
  grunt.registerTask('default', ['sass', 'cssmin', 'watch']);
};
