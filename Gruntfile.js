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
		// combine plugins JS
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
		// minifies JS
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
    // process SASS
    sass: {
      dist: {
        files: [{
          expand: true,
          src: ['<%= paths.styles %>/theme.scss'],
          dest: '<%= paths.build %>/tmp',
          ext: '.css'
        }]
      }
    },
    concat_css: {
      // for local, all CSS concatenated
      local: {
        src: ['<%= paths.styles %>/css/*.css',
              '<%= paths.build %>/tmp/**/*.css' ],
        dest: '<%= paths.build %>/css/local.css'
      },
      // for distribution, all CSS concatenated except for those with Tumblr variable
      dist: {
        src: ['<%= paths.styles %>/css/normalize.css',
              '<%= paths.build %>/tmp/**/*.css' ],
        dest: '<%= paths.build %>/css/dist.css'
      }
    },
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
		// Add includes (layout), CSS, JS to theme template
    htmlbuild: {
      // Local build inlines all CSS for quick testing. JS linked via Tumblr's static asset URL. 
			local: {
				src: 'src/theme.html',
        dest: '<%= paths.build %>/',
				options: {
					beautify: false,
          styles: {
              theme: '<%= paths.build %>/css/local.css'
          },
          data: {
              static_css_url: "NULL",
              static_js_url: "<%= pkg.staticJS %>",
          },
					sections: {
              meta: '<%= paths.layout %>/meta.html',
              read_more: '<%= paths.layout %>/read_more.html',
              social: '<%= paths.layout %>/social.html',
              disqus: '<%= paths.layout %>/disqus.html'
					}
				}
			},
      // Distribution build only inlines CSS with Tumblr variables and links remaining CSS and JavaScript via Tumblr's static asset URL
      dist:  {
				src: 'src/theme.html',
        dest: '<%= paths.build %>/',
				options: {
					beautify: false,
          styles: {
              theme: [
              '<%= paths.styles %>/css/variables.css',
              '<%= paths.styles %>/css/customcss.css',
              ]
          },
          data: {
              static_css_url: "<%= pkg.staticCSS %>",
              static_js_url: "<%= pkg.staticJS %>",
          },
					sections: {
              meta: '<%= paths.layout %>/meta.html',
              read_more: '<%= paths.layout %>/read_more.html',
              social: '<%= paths.layout %>/social.html',
              disqus: '<%= paths.layout %>/disqus.html'
					}
				}
			}
		},
		clean: [ '<%= paths.build %>/tmp' ]
	});

	// load dependencies
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html-build');
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
	// prepare plugins
	grunt.registerTask('plugins', ['concat', 'uglify']);
	grunt.registerTask('styles', ['sass', 'concat_css']);
	grunt.registerTask('template', ['htmlbuild:local']);
  
  // prepare theme
	grunt.registerTask('local', ['sass', 'concat_css:local', 'htmlbuild:local', 'clean']);
	grunt.registerTask('dist', ['sass', 'concat_css:dist', 'cssmin', 'htmlbuild:dist', 'clean']);
}
