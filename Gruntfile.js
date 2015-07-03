module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [ "dist/" ],
		browserify: {
			dist: {
				src: "index.js",
				dest: "dist/async-while.js",
				options: {
					browserifyOptions: { standalone: "asyncWhile" }
				}
			},
			dev: {
				src: "index.js",
				dest: "dist/async-while.dev.js",
				options: {
					browserifyOptions: { debug: true, standalone: "asyncWhile" }
				}
			}
		},
		wrap2000: {
			scripts: {
				files: [{
					expand: true,
					cwd: "dist/",
					src: [ "*.js" ],
					dest: "dist/",
					isFile: true
				}],
				options: {
					header: "/*\n * Async While\n * (c) 2015 Tyler Johnson\n * MIT License\n * Version <%= pkg.version %>\n */\n"
				}
			}
		},
		uglify: {
			dist: {
				src: "dist/async-while.js",
				dest: "dist/async-while.min.js"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-wrap2000');

	grunt.registerTask('default', [ 'clean', 'browserify', 'uglify', 'wrap2000' ]);
}
