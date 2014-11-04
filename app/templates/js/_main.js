requirejs.config({
  baseUrl: 'js/',
  paths: {
    'jquery': 'lib/jquery/dist/jquery.min'
  },
  //"shim": {
    //"jquery.alpha": ["jquery"],
    //"jquery.beta": ["jquery"]
  //}
});

var modules = [];
var scripts = document.getElementsByTagName('script');
for (var i = 0, l = scripts.length; i < l; i++) {
  if (scripts[i].getAttribute('data-modules')) {
    modules = scripts[i].getAttribute('data-modules').split(',');
    break;
  }
}

requirejs(modules);
