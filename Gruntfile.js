module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'), 

        // Copy fonts or css from node_modules folder to respective folders into public folder
        copy: {
          socketiojs: {
            expand: true,
            cwd: 'node_modules/socket.io-client/',
            src: ['socket.io.js'],
            dest: 'public/js/'
          },
          bootstrapjs: {
            expand: true,
            cwd: 'node_modules/bootstrap/dist/js/',
            src: ['bootstrap.min.js'],
            dest: 'public/js/'
          },
          bootstrapcss: {
            expand: true,
            cwd: 'node_modules/bootstrap/dist/css/',
            src: ['bootstrap.css'],
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
        // To concatenate files into one file without minification
        concat: {
            js: {
                options: {
                  separator: ';',
                },
                src: ['public/js/jquery.js', 'public/js/bootstrap.min.js', 'public/js/socket.io.js', 'public/js/custom.js'],
                dest: 'public/js/concat.js'
            },
            css: {
                src: ['public/css/bootstrap.css', 'public/css/style.css'],
                dest: 'public/css/concat.css'
            }
        },
        // Minify all css files and combine into them into single file and excluding files with extension .css.map
        cssmin: {
            combine: {
                files: {
                    'public/css/combined.css': ['public/css/concat.css']
                }
            }
        },
        // Minify all js files and combined them into single file
        uglify: {
            options: {
                mangle: false,
                compress: { 
                    hoist_funs: false 
                }
            }
            , target: {
                files: {
                    'public/js/combined.js': ['public/js/concat.js']
                }
            }
        },
        // Run taks automatically whenever you make changes in specified files or folders
        watch: {
            files: ['public/sass/*.scss', 'public/js/custom.js'], 
            tasks: ['sass','concat','cssmin','uglify'],
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['watch']);
};