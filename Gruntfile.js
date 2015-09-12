module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        copy: {
            libs: {
                src: 'bower_components/sockjs-client/dist/sockjs-0.3.4.min.js',
                dest: 'public/js/sockjs.min.js'
            }
        },
        uglify: {
            libs: {
                src: 'bower_components/vertx3-eventbus-client/vertxbus.js',
                dest: 'public/js/vertxbus.min.js'
            }
        }
    });

    grunt.registerTask('build', ['copy:libs', 'uglify:libs']);

};