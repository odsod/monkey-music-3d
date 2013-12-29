module.exports = (grunt) ->

  @initConfig
    browserify:
      dev:
        src: ['lib/index.js']
        dest: 'build/index.js'
        options:
          alias: ['lib/shim/three.js:three']
    watch:
      scripts:
        files: 'lib/**/*.js'
        tasks: ['browserify']

  @loadNpmTasks 'grunt-browserify'
  @loadNpmTasks 'grunt-contrib-watch'

  @registerTask 'default', 'browserify'
