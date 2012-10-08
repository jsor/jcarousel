/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                '* Released under the <%= _.pluck(pkg.licenses, "type").join(", ") %> license */'
        },
        concat: {
            all: {
                src: [
                    '<banner:meta.banner>',
                    '<file_strip_banner:src/core.js>',
                    '<file_strip_banner:src/core_plugin.js>',
                    '<file_strip_banner:src/control.js>',
                    '<file_strip_banner:src/pagination.js>',
                    '<file_strip_banner:src/autoscroll.js>'
                ],
                dest: 'dist/jquery.<%= pkg.name %>.js'
            },
            core: {
                src: [
                    '<banner:meta.banner>',
                    '<file_strip_banner:src/core.js>',
                    '<file_strip_banner:src/core_plugin.js>'
                ],
                dest: 'dist/jquery.<%= pkg.name %>-core.js'
            },
            control: {
                src: [
                    '<banner:meta.banner>',
                    '<file_strip_banner:src/control.js>'
                ],
                dest: 'dist/jquery.<%= pkg.name %>-control.js'
            },
            pagination: {
                src: [
                    '<banner:meta.banner>',
                    '<file_strip_banner:src/pagination.js>'
                ],
                dest: 'dist/jquery.<%= pkg.name %>-pagination.js'
            },
            autoscroll: {
                src: [
                    '<banner:meta.banner>',
                    '<file_strip_banner:src/autoscroll.js>'
                ],
                dest: 'dist/jquery.<%= pkg.name %>-autoscroll.js'
            }
        },
        min: {
            all: {
                src: ['<banner:meta.banner>', '<config:concat.all.dest>'],
                dest: 'dist/jquery.<%= pkg.name %>.min.js'
            },
            core: {
                src: ['<banner:meta.banner>', '<config:concat.core.dest>'],
                dest: 'dist/jquery.<%= pkg.name %>-core.min.js'
            },
            control: {
                src: ['<banner:meta.banner>', '<config:concat.control.dest>'],
                dest: 'dist/jquery.<%= pkg.name %>-control.min.js'
            },
            pagination: {
                src: ['<banner:meta.banner>', '<config:concat.pagination.dest>'],
                dest: 'dist/jquery.<%= pkg.name %>-pagination.min.js'
            },
            autoscroll: {
                src: ['<banner:meta.banner>', '<config:concat.autoscroll.dest>'],
                dest: 'dist/jquery.<%= pkg.name %>-autoscroll.min.js'
            }
        },
        replace: {
            dist: {
                options: {
                    variables: {
                        'VERSION': '<%= pkg.version %>',
                        'DATE': '<%= grunt.template.today() %>'
                    },
                    prefix: '@'
                },
                files: {
                    'dist/': ['dist/*.js']
                }
            }
        },
        qunit: {
            files: ['test/unit/**/*.html']
        },
        lint: {
            files: ['grunt.js', 'src/*.js', 'test/**/*.js']
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint qunit'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true,
                // QUnit
                ok: true,
                equal: true,
                expect: true,
                test: true,
                module: true,
                notEqual: true
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', 'lint qunit');
    grunt.registerTask('dist', 'concat replace min');

};
