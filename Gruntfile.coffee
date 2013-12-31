module.exports = (grunt) ->

  @initConfig
    browserify:
      dev:
        src: ['lib/index.js']
        dest: 'build/index.js'
        options:
          alias: ['lib/shim/three.js:three']
    sprite:
      block:
        src: 'assets/textures/block/*.png'
        destImg: 'assets/textures/block.png'
        destCSS: 'assets/textures/block/block.css'
    watch:
      scripts:
        files: 'lib/**/*.js'
        tasks: ['browserify']
        options:
          livereload: true

  @loadNpmTasks 'grunt-browserify'
  @loadNpmTasks 'grunt-spritesmith'
  @loadNpmTasks 'grunt-contrib-watch'

  @registerTask 'default', ['browserify']
