module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
		dev:{
			files: [
			  {
				expand: true,
				cwd: 'less',
				src: ['*.less'],
				dest: 'css/',
				ext: '.css'
			  }
			]}
        },
        concat: {
            options: {
                separator: ';\n',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: ['js/*.js'],
                dest: 'release/ss.all.js'
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true,
                SourceMap: "release/application.map",
                banner: "/* test 2014*/\n"
            },
            dist: {
                src: "release/ss.all.js",
                dest: "release/ss.all.min.js"
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            },
            combine: {
                files: {
                    'release/ss.style.min.css': ['css/*.min.css']
                }
            }
        },
        less:{
            dev:{
                files:[{
                    "css/jquery.alert.css":"less/jquery.alert.less"
                }]
            }
        },
        watch:{
            less:{
                files:['less/*.less'],
                tasks:['compileless'],
                options:{
                    spawn:false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('check', ['jshint']);
    grunt.registerTask('css', ['cssmin:minify', 'cssmin:combine']);
	grunt.registerTask('js', ['concat', 'uglify']);
	grunt.registerTask('compileless', ['less:dev']);
    grunt.registerTask('default', ['cssmin', 'concat', 'uglify', 'cless']);


};