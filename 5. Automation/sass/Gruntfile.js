'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};


module.exports = function (grunt) {

    grunt.initConfig({
        compass: {
            dist: {
                options: {
                    basePath: 'src/',
                    config: 'src/config.rb',
                    cssDir: 'css',
                    environment: 'production'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/img/', src: ['**'], dest: 'production/img'}, // copy all the pics
                    //{expand: true, cwd: 'src/sass', src: ['**'], dest: 'production/sass'}, //im not sure we need that
                    {expand: true, cwd: 'src/css', src: ['**'], dest: 'production/css'},
                    //{expand: true, cwd: 'src/js', src: ['**'], dest: 'production/js'}
                ]
            }
        },
        concat: {
            dist: {
                'src': [
                    'src/js/*.js'
                ],
                dest: 'production/js/app.js'
            }
        },
        min: {
            dist: {
                'src': ['production/js/app.js'],
                'dest': 'production/js/app.min.js'
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: {
                    'production/img/*.png': 'src/img/*.png',
                    //'production/img/*.jpg': 'src/img/*.jpg'
                }
            }
        },
        watch: {
            files: ['src/sass/*.scss', 'src/*html', 'src/js/*.js'],
            tasks: ['compass', 'copy']
        },
    });
    // Load task definitions and grunt plugins
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);


    grunt.registerTask('default', ['compass', 'copy']);
    grunt.registerTask('release', ['compass', 'copy','min']);


};