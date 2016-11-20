module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'), 

        // Copy fonts or css from node_modules folder to respective folders into public folder
        copy: {
          bootstrapjs: {
            expand: true,
            cwd: 'node_modules/bootstrap/dist/js/',
            src: ['bootstrap.min.js'],
            dest: 'public/js/'
          },
          bootstrapcss: {
            expand: true,
            cwd: 'node_modules/bootstrap/dist/css/',
            src: ['bootstrap.min.css'],
            dest: 'public/css/'
          },
          bootstrapfonts: {
            expand: true,
            cwd: 'node_modules/bootstrap/dist/fonts/',
            src: ['*'],
            dest: 'public/fonts/'
          }
        },
        //Compile SCSS file from sass folder to CSS file into css folder
        sass: {
            dist: {
                files: {
                    'public/css/style.css': 'public/sass/style.scss'
                }
            }
        },
        // Minify all css files and combine into them into single file and excluding files with extension .css.map
        cssmin: {
            combine: {
                files: {
                    'public/css/combined.css': ['public/css/bootstrap.min.css', 'public/css/style.css', '!public/css/*.css.map']
                }
            }
        },
        // Minify all js files and combined them into single file
        uglify: {
            options: {
                mangle: false
            }
            , target: {
                files: {
                    'public/js/combined.js': ['public/js/jquery.js', 'public/js/bootstrap.min.js', 'public/js/custom.js']
                }
            }
        },
        // Run taks automatically whenever you make changes in specified files or folders
        watch: {
            files: ['public/sass/*.scss'], 
            tasks: ['sass','cssmin'],
            options: {
              livereload: true
            }
        },

        nodemon: {
            dev: {
                script: 'app.js'
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['nodemon']);
};