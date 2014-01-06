module.exports = (grunt) ->

  @initConfig
    browserify:
      dev:
        src: ['lib/index.coffee']
        dest: 'build/index.js'
        options:
          alias: ['lib/shim/three.js:three', 'lib/shim/tween.js:tween']
          transform: ['coffeeify']
          debug: true
    sprite:
      block:
        src: 'assets/textures/block/*.png'
        destImg: 'assets/textures/block.png'
        destCSS: 'assets/textures/block/block.css'
    watch:
      scripts:
        files: ['lib/**/*.coffee', 'lib/**/*.js', 'levels/*.json']
        tasks: ['browserify:dev']
        options:
          livereload: true

  @loadNpmTasks 'grunt-browserify'
  @loadNpmTasks 'grunt-spritesmith'
  @loadNpmTasks 'grunt-contrib-watch'

  @registerTask 'default', ['browserify']
