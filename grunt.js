/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        qunit: {
            files: ['test/unit/**/*.html']
        },
        lint: {
            files: ['grunt.js', 'src/**/*.js', 'test/**/*.js', 'plugins/*/src/**/*.js', 'plugins/*/test**/*.js']
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
                // RequireJS
                define: true,
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

    // Default task.
    grunt.registerTask('default', 'lint qunit');

};
