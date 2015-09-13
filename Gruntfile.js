module.exports = function (grunt) {
    grunt.initConfig({
        esteWatch: {
            options: {
                dirs: ['dist', 'src/**'],
                livereload: {
                    enabled: true,
                    extensions: ['js', 'html', 'css']
                }
            },
            ts: function (fllepath) {
                return 'typescript';
            },
        },
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'dist/',
                options: {
                    target: 'es5',
                    sourceMap: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-este-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.registerTask('default', ['esteWatch']);
    grunt.registerTask('build', ['typescript']);
};
