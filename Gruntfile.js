/**
 * Created by huiminliu on 2017/6/2.
 */
module.exports = function (grunt) {
  //load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(function(task) {
       grunt.loadNpmTasks(task);
    });

    //config plugins
    grunt.initConfig({
       cafemocha: {
            all: {
                src: 'qa/tests-*.js', options: {ui: 'tdd'},
            }
       },

        jshint: {
           app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
            qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
        },


        exec: {

        },

    });

    //register tasks
    grunt.registerTask('default', ['cafemocha', 'jshint', ]);
};