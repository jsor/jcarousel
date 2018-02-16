'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.description %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) 2006-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= pkg.license %> */\n',
        clean: {
            files: ['dist/*.js']
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            all: {
                src: [
                    'src/core.js',
                    'src/core_plugin.js',
                    'src/scrollintoview.js',
                    'src/control.js',
                    'src/pagination.js',
                    'src/autoscroll.js'
                ],
                dest: 'dist/jquery.<%= pkg.name %>.js'
            },
            core: {
                src: [
                    'src/core.js',
                    'src/core_plugin.js'
                ],
                dest: 'dist/jquery.<%= pkg.name %>-core.js'
            },
            scrollintoview: {
                src: [
                    'src/scrollintoview.js'
                ],
                dest: 'dist/jquery.<%= pkg.name %>-scrollintoview.js'
            },
            control: {
                src: [
                    'src/control.js'
                ],
                dest: 'dist/jquery.<%= pkg.name %>-control.js'
            },
            pagination: {
                src: [
                    'src/pagination.js'
                ],
                dest: 'dist/jquery.<%= pkg.name %>-pagination.js'
            },
            autoscroll: {
                src: [
                    'src/autoscroll.js'
                ],
                dest: 'dist/jquery.<%= pkg.name %>-autoscroll.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            all: {
                src: '<%= concat.all.dest %>',
                dest: 'dist/jquery.<%= pkg.name %>.min.js'
            },
            core: {
                src: '<%= concat.core.dest %>',
                dest: 'dist/jquery.<%= pkg.name %>-core.min.js'
            },
            scrollintoview: {
                src: '<%= concat.scrollintoview.dest %>',
                dest: 'dist/jquery.<%= pkg.name %>-scrollintoview.min.js'
            },
            control: {
                src: '<%= concat.control.dest %>',
                dest: 'dist/jquery.<%= pkg.name %>-control.min.js'
            },
            pagination: {
                src: '<%= concat.pagination.dest %>',
                dest: 'dist/jquery.<%= pkg.name %>-pagination.min.js'
            },
            autoscroll: {
                src: '<%= concat.autoscroll.dest %>',
                dest: 'dist/jquery.<%= pkg.name %>-autoscroll.min.js'
            }
        },
        replace: {
            dist: {
                options: {
                    variables: {
                        'VERSION': '<%= pkg.version %>',
                        'DATE': '<%= grunt.template.today("yyyy-mm-dd") %>'
                    },
                    prefix: '@'
                },
                files: [
                    {
                        'src': ['dist/*.js'],
                        'dest': './'
                    }
                ]
            }
        },
        qunit: {
            files: ['test/unit/**/*.html']
        },
        watch: {
            src: {
                src: ['src/**/*.js'],
                tasks: ['qunit']
            },
            test: {
                src: ['test/unit/**/*.js'],
                tasks: ['qunit']
            }
        }
    });

    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['qunit']);
    grunt.registerTask('dist', ['clean', 'concat', 'replace', 'uglify']);

};
