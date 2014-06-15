module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        closure_path: process.env.CLOSURE_PATH,
        'closure-compiler': {
            frontend: {
                js: 'src/<%= pkg.name %>.js',
                jsOutputFile: 'build/<%= pkg.name %>.js',
                noreport: true,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    externs: '<%= closure_path %>/contrib/externs/jquery-1.7.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-closure-compiler');

    grunt.registerTask('default', ['closure-compiler']);

};
