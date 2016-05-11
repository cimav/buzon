/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    torii: {
      //sessionServiceName: 'session:custom',
      providers: {
        'google-token': {
          apiKey: '872734752962-432svac1f3i0mghtv9cpvs7ct0duioc3.apps.googleusercontent.com',
          scope: 'email',
          // redirectUri: 'http://localhost:9000'
          redirectUri: 'http://sugerencias.cimav.edu.mx'
        }
      }
    }

    
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'posts',
    routeIfAlreadyAuthenticated: 'posts'
  };

  ENV.contentSecurityPolicy = {
    'connect-src': "'self' http://sugerencias.cimav.edu.mx"
  }


  return ENV;
};
