module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'closure-compiler': {
            frontend: {
                js: 'src/<%= pkg.name %>.js',
                jsOutputFile: 'build/<%= pkg.name %>.js',
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    externs: 'externs/jwplayer.js'
                }
            }
        },
        jsdoc: {
            dist: {
                src: 'src/*.js',
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['closure-compiler', 'jsdoc']);

};
