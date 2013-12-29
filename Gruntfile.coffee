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
      textures:
        files: 'assets/textures/*'
        tasks: ['textures']

  @loadNpmTasks 'grunt-browserify'
  @loadNpmTasks 'grunt-contrib-watch'

  @registerTask 'default', 'browserify'

  @registerTask 'textures', () ->
    datauri = require 'datauri'
    lines = ['var THREE = window.THREE']
    lines = ['var images = {};']
    grunt.file.recurse './assets/textures', (abspath, rootdir, subdir, filename) ->
      name = filename.split('.')[0]
      lines.push "images['#{name}'] = new Image();"
      lines.push "images['#{name}'].src = '#{datauri(abspath)}';"
      lines.push "exports['#{name}'] = new THREE.Texture(images['#{name}']);"
      lines.push "exports['#{name}'].needsUpdate = true;"
      lines.push "exports['#{name}'].magFilter = THREE.NearestFilter;"
    grunt.file.write 'lib/textures.js', lines.join('\n')
    console.log 'File lib/textures.js created.'
