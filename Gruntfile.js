module.exports = function (grunt) {
    grunt.initConfig({
        esteWatch: {
            options: {
                dirs: ['app', 'src/**'],
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
            demo: {
                src: ['src/**/*.ts'],
                dest: 'app/',
                options: {
                    target: 'es5',
                    sourceMap: true
                }
            },
            dist: {
                src: ['src/*.ts'],
                dest: 'dist/',
                options: {
                    target: 'es5',
                    sourceMap: false
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-este-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.registerTask('default', ['esteWatch']);
    grunt.registerTask('build', ['typescript']);
};
