module.exports = function(grunt) {
  grunt.initConfig({
    paths: {
      bower: 'bower_components',
      build: 'build',
      js: 'src/js',
      layout: 'src/includes',
      template: 'src/template',
      styles: 'src/styles'
    },
    pkg: grunt.file.readJSON('package.json'),
    // Combine JavaScript plugins
    concat: {
      dist: {
        src: [ '<%= paths.bower %>/jquery/dist/*.min.js',
               '<%= paths.bower %>/fitvids/*.js',
               '<%= paths.bower %>/photoset-grid/*.min.js',
               '<%= paths.js %>/*.js'
              ],
        dest: '<%= paths.build %>/tmp/plugins.js'
      }
    },
    // Minify theme JavaScript
    uglify: {
      options: {
        preserveComments: 'all',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= paths.build %>/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }

    },
    // Process SASS files
    sass: {
      dist: {
        files: [{
          expand: true,
          src: ['<%= paths.styles %>/theme.scss'],
          dest: '<%= paths.build %>/sass-output',
          ext: '.css'
        }]
      }
    },
    // Concatenate CSS files
    concat_css: {
      inline: {
        src: ['<%= paths.styles %>/css/*.css',
              '<%= paths.build %>/sass-output/**/*.css' ],
        dest: '<%= paths.build %>/css/inline.css'
      },
      dist: {
        src: ['<%= paths.styles %>/css/normalize.css',
              '<%= paths.build %>/sass-output/**/*.css' ],
        dest: '<%= paths.build %>/css/dist.css'
      }
    },
    // Minify CSS
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['<%= paths.build %>/css/*.css', '<%= paths.build %>/!*.min.css'],
          dest: '',
          ext: '.min.css'
        }]
      }
    },
    // Build HTML template with HTML includes, CSS and JavaScript to single theme HTML file
    htmlbuild: {
      // Inline all web assets
      inline: {
        src: 'src/theme.html',
        dest: '<%= paths.build %>/',
        options: {
          beautify: false,
          scripts: {
              theme: '<%= paths.build %>/<%= pkg.name %>.min.js'
          },
          styles: {
              theme: '<%= paths.build %>/css/inline.css'
          },
          sections: {
              meta: '<%= paths.layout %>/meta.html',
              sidebar_widgets: '<%= paths.layout %>/sidebar_widgets.html',
              read_more: '<%= paths.layout %>/read_more.html',
              social: '<%= paths.layout %>/social.html',
              disqus: '<%= paths.layout %>/disqus.html'
          }
        }
      },
      // Use links from package.json for CSS and JavaScript
      dist:  {
        src: 'src/theme.html',
        dest: '<%= paths.build %>/',
        options: {
          beautify: false,
          styles: {
              theme: [
              '<%= paths.styles %>/css/variables.css',
              '<%= paths.styles %>/css/customcss.css'
              ]
          },
          data: {
              static_css_url: "<%= pkg.staticCSS %>",
              static_js_url: "<%= pkg.staticJS %>"
          },
          sections: {
              meta: '<%= paths.layout %>/meta.html',
              sidebar_widgets: '<%= paths.layout %>/sidebar_widgets.html',
              read_more: '<%= paths.layout %>/read_more.html',
              social: '<%= paths.layout %>/social.html',
              disqus: '<%= paths.layout %>/disqus.html'
          }
        }
      }
    },
    clean: [ '<%= paths.build %>/sass-output', '<%= paths.build %>/tmp' ]
  });

  // Load dependencies
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Prepare and test plugins if required
  grunt.registerTask('plugins', ['concat', 'uglify']);
  grunt.registerTask('styles', ['sass', 'concat_css']);
  grunt.registerTask('template', ['htmlbuild:inline']);

  // Theme build tasks
  grunt.registerTask('inline', ['concat', 'uglify', 'sass', 'concat_css:inline', 'htmlbuild:inline', 'clean']);
  grunt.registerTask('inline-no-js', ['sass', 'concat_css:inline', 'htmlbuild:inline', 'clean']);
  grunt.registerTask('dist', ['concat', 'uglify', 'sass', 'concat_css:dist', 'cssmin', 'htmlbuild:dist', 'clean']);
}
