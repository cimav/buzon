import Ember from 'ember';
import DS from 'ember-data';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  account: function() {
    var userId = this.get('session.content.authenticated.userId');
    
    if (userId && this.get('isAuthenticated')) {
      var user = true;

      return DS.PromiseObject.create({
               promise: this.container.lookup('service:store').find('user', userId)
             });
    }
  }.property('isAuthenticated')
});