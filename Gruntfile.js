module.exports = function(grunt) {
	grunt.initConfig({
		paths: {
			bower: 'bower_components',
			build: 'build',
			javas: 'src/js',
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
    // concat css
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
      all: {
        src: ['<%= paths.styles %>/css/*.css',
              '<%= paths.build %>/tmp/**/*.css' ],
        dest: '<%= paths.build %>/<%= pkg.name %>.css'
      }
    },
		// put CSS into theme, and write version number
    htmlbuild: {
			local: {
				src: 'src/theme.html',
        dest: '<%= paths.build %>/',
				options: {
					beautify: false,
          styles: {
              theme: '<%= paths.build %>/<%= pkg.name %>.css'
          },
					sections: {
              meta: '<%= paths.layout %>/meta.html',
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
  
	// prepare plugins
	grunt.registerTask('plugins', ['concat', 'uglify']);
	grunt.registerTask('styles', ['sass', 'concat_css']);
	grunt.registerTask('template', ['htmlbuild:local']);
  
  // prepare theme
	grunt.registerTask('local', ['sass', 'concat_css', 'htmlbuild:local', 'clean']);
	grunt.registerTask('dist', ['sass', 'concat_css', 'htmlbuild:local', 'clean']);
}
