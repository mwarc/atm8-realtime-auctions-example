module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        copy: {
            libs: {
                src: 'bower_components/sockjs-client/dist/sockjs-0.3.4.min.js',
                dest: 'public/scripts/sockjs.min.js'
            },
            scripts: {
                src: 'src/main/resources/scripts/realtime-auctions.js',
                dest: 'public/scripts/realtime-auctions.js'
            }
        },
        uglify: {
            libs: {
                src: 'bower_components/vertx3-eventbus-client/vertxbus.js',
                dest: 'public/scripts/vertxbus.min.js'
            }
        },
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

    grunt.registerTask('build', ['copy', 'uglify:libs', 'less:main']);

};