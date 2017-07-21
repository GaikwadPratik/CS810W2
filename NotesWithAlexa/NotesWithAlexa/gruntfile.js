'use strict'
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        src: ["package.json", "Procfile", "app.json"],
                        dest: "./dist"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [
                    {
                        src: ["*.ts", "!node_modules/**"],
                        dest: "./dist"
                    }
                ],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: true
                }
            }
        },
        watch: {
            ts: {
                files: ["*.ts"],
                tasks: ["ts", "copy"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", ["copy", "ts"]);
}