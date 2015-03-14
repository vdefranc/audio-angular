'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require( 'connect-livereload' )({ port: LIVERELOAD_PORT });
var mountFolder = function ( connect, dir ) {
  return connect.static( require( 'path' ).resolve( dir ) );
};

module.exports = function(grunt) {
	grunt.initConfig({
	    watch: {
	    	options: {
					nospawn: true,
					livereload: LIVERELOAD_PORT
				},
			css: {
				files: 'src/css/*.scss',
				tasks: ['sass']
			},
			livereload: {
		        files: [
		          'index.html',
		          'src/**/*'
		        ],
		        tasks: [ 'build' ]
		      }
	    },
	    jshint: {
	    	files: ['src/js/**/*.js', 'src/js/*.js'],
	      	options: {
	        	globals: {
	          		angular: true
	        	}
	      	}
	    },
		sass: {
			dist: {
				files: {
					'dist/audio-angular.css' : 'src/css/compiled/compiled-sass.scss'
				}
			}
		},
		concat: {
			js: {
				src: ['src/js/audio-angular.js', 'src/js/second.js'],
				dest: 'dist/audio-angular.js'
			},
			css: {
				src: ['src/css/template.scss', 'src/css/!(template)*.scss'],
				dest: 'src/css/compiled/compiled-sass.scss'
			}
		},
	    open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
   		},
		connect: {
			options: {
					port: 9000,
					hostname: 'localhost'
				},
			livereload: {
				options: {
					middleware: function ( connect ) {
						return [
							lrSnippet,
							mountFolder( connect, '.' )
						];
					}
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('build', [ 'jshint', 'concat', 'sass' ]);
	grunt.registerTask('server', ['connect:livereload', 'open', 'watch' ] );
	grunt.registerTask('default', ['build']);


};