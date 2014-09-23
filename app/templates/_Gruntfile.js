module.exports = function(grunt) {
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        curly : true,
        eqeqeq : true,
        immed : true,
        latedef : true,
        newcap : true,
        noarg : true,
        sub : true,
        undef : true,
        eqnull : true,
        browser : true,
        globals : {
          require : false,
          requirejs : false,
          define : false,
          jQuery : true,
          $ : true,
          console : true
        }
      },
      '<%%= pkg.name %>' : {
        src : [ 'js/**/*.js', '!js/lib/**/*.js', '!js/**/*.min.js' ]
      }
    },

    concat: {
      css : {
        src: ['stylesheets/*', 'src/css/*', '!stylesheets/*.map'],
        dest: 'css/style.css'
      }
    },

    uglify : {
      options : {
        stripBanners : true,
        banner: '/* <%%= pkg.name %> - v<%%= pkg.version %> - <%%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build : {
        files : [{
          expand : true,
          src : ['*.js', '!lib/**/*.js', '!*.min.js'],
          dest : 'js',
          cwd : 'js',
          ext : '.min.js'
        }]
      }
    },

    cssmin: {
      with_banner : {
        options : {
          banner : '/* Styles for <%%= pkg.name %> */',
        },
        files : {
          'css/style.min.css' : ['src/css/*', 'stylesheets/*']
        }
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb',
          sourcemap: true
        }
      }
    },

    watch : {
      scripts : {
        files : ['js/*.js', '!js/lib/**/*.js', '!js/*.min.js'],
        tasks : ['jshint', 'jscs'],
        options: {
          livereload: true,
        }
      },
      sass : {
        files : ['sass/*'],
        tasks : ['csscomb', 'compass', 'concat', 'copy'],
        options: {
          livereload: true,
        }
      },
      css : {
        files : ['src/css/*.css'],
        tasks : ['concat'],
        options: {
          livereload: true,
        }
      },
<% if (images) { %>
      images : {
        files : ['img/ui/<%= retina ? "normal/" : ""%>*.png'],
        tasks : [<%= retina ? "'clean', 'responsive_images', " : ""%><%= sprite ? "'sprite'" : ""%>],
        options: {
          livereload: true,
        }
      },
<% } %>
<% if (base64) { %>
      base64 : {
        files : ['img/base64/base64.css'],
        tasks : ['imageEmbed', 'concat'],
        options: {
          livereload: true,
        }
      },
<% } %>
      html : {
        files : ['**/*.html'],
        options: {
          livereload: true,
        }
      }
    },

    removelogging : {
      dist : {
        src: 'js/*.min.js',
      }
    },

    jscs : {
      main : ['js/*.js', '!js/lib/**.js', '!js/*.min.js']
    },
    csscomb: {
      scss: {
        expand: true,
        cwd: 'sass/',
        src: ['*.scss'],
        dest: 'sass/'
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          livereload: true
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          flatten: true,
          src: ['stylesheets/*.map'],
          dest: 'css/',
          filter: 'isFile'
        }]
      }
    },
  
<% if (retina) { %>
    responsive_images: {
      ui: {
        options: {
          engine: 'im',
          sizes: [{
            width: '50%',
            height: '50%',
            suffix: '_x1',
            rename: false
          }]
        },
        files: [{
          expand: true,
          src: ['**.png'],
          cwd: 'img/ui/retina',
          dest: 'img/ui/normal'
        }]
      }
    },
<% } %>
<% if (sprite) { %>
    sprite: {
<% if (retina) { %>
      retina: {
        padding: 40,
        src: 'img/ui/retina/*.png',
        destImg: 'img/ui_2x.png',
        destCSS: 'sprites/_ui_2x.scss',
      },
<% } %>
      normal: {
        padding: 40,
        src: 'img/ui/<%= retina ? "normal/" : ""%>*.png',
        destImg: 'img/ui.png',
        destCSS: 'sprites/_ui.scss',
      }
    },
<% } %>
<% if (base64) { %>

    imageEmbed: {
      dist: {
        src: [ 'img/base64/base64.css' ],
        dest: 'stylesheets/base64.css',
        options: {
          deleteAfterEncoding : false
        }
      }
    },
<% } %>
<% if (retina) { %>
    clean: {
      uinormal: {
        src: ['img/ui/normal/']
      }
    },
<% } %>
<% if (tests) { %>
    mocha_phantomjs: {
      all: ['test/**/*.html']
    },
<% } %>
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, // maximum number of notifications from jshint output
        title: '<%%= pkg.name %>' // defaults to the name in package.json, or will use project directory's name
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-remove-logging');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-jscs-checker');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
<%if (retina) { %>
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
<% } %>
<%if (sprite) { %>
  grunt.loadNpmTasks('grunt-spritesmith');
<% } %>
<%if (base64) { %>
  grunt.loadNpmTasks('grunt-image-embed');
<% } %>
<%if (tests) { %>
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
<% } %>

  // This is required if you use any options.
  grunt.task.run('notify_hooks');

  grunt.registerTask('default',[
  <%= retina ? "'clean', 'responsive_images', " : ""%>
  <%= sprite ? "'sprite', " : ""%>'jshint', 'jscs',
  <%= base64 ? "'imageEmbed', " : ""%>'csscomb', 'compass', 'concat', 'copy', 'connect', 'watch']);
  grunt.registerTask('dist', ['jshint', 'jscs', 'uglify', 'compass', 'concat',
  'copy', 'cssmin']);
  <%if (tests) { %>
  grunt.registerTask('test', ['mocha_phantomjs']);
  <% } %>
};
