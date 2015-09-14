module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        less: {
            main: {
                files: {
                    "public/styles/main.css": "src/main/resources/styles/index.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['src/main/resources/styles/**/*.less'],
                tasks: ['less:main']
            }
        }
    });

    grunt.registerTask('build', ['less:main']);

};