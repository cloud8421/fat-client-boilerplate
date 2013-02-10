var require = {
  baseUrl: './src',
  paths: {
    'jquery': 'vendor/jquery/jquery.min',
    'underscore': 'vendor/underscore-amd/underscore-min',
    'backbone': 'vendor/backbone-amd/backbone-min',
    'backbone-validation': 'vendor/backbone-validation/dist/backbone-validation-amd',
    'backbone.wreqr': 'vendor/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.babysitter': 'vendor/backbone.babysitter/lib/amd/backbone.babysitter',
    'jade': 'vendor/require-jade/jade',
    'marionette': 'vendor/marionette/lib/core/amd/backbone.marionette',
    'rivets': 'vendor/rivets/lib/rivets.min',
    'text': 'vendor/requirejs-text/text'
  },
  shim: {
    rivets: {
      exports: 'rivets'
    }
  }
};
