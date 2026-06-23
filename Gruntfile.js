module.exports = function (grunt) {
    require('time-grunt')(grunt);
    // require('load-grunt-config')(grunt, {
    //     jitGrunt: {
    //         staticMappings: {
    //             scsslint: 'grunt-scss-lint'
    //         }
    //     }
    // });
    require('load-grunt-config')(grunt);

    grunt.loadNpmTasks('grunt-run');
    // grunt.registerTask('default', ['eslint', 'jest', 'scsslint', 'svgstore'])
    grunt.loadNpmTasks('grunt-stylelint');
    grunt.registerTask('default', ['eslint', 'svgstore']);
};
