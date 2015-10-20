import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';
import raw from 'ic-ajax';

const { RSVP } = Ember;
const { service } = Ember.inject;

export default Torii.extend({
  torii: service('torii'),

  authenticate: function() {
    return new RSVP.Promise((resolve, reject) => {
      this._super(...arguments).then((data) => {
        raw({
          url:      'http://localhost:3000/users',
          type:     'GET',
          dataType: 'json',
          data:     { 'email': data.userEmail }
        }).then((response) => {
          resolve({
            access_token: response.users[0].id,
            provider: 'google-token',
            userId: response.users[0].id,
            userEmail: response.users[0].email,
            // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
          });
        }, reject);
      }, reject);
    });
  },
  restore: function(data) {   
    var resolveData = data || {};
    this.provider = resolveData.provider;
    return new Ember.RSVP.Promise(function(resolve) { 
      resolve(resolveData); 
    });
   },
  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      resolve();
    });
  }
});