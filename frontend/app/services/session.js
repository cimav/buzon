import Ember from 'ember';
import DS from 'ember-data';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
  store: Ember.inject.service(),
  user_id: function() {
    return this.get('session.content.authenticated.userId');
  }.property('isAuthenticated'),
  account: function() {
    var userId = this.get('session.content.authenticated.userId');
    
    if (userId && this.get('isAuthenticated')) {
      var user = true;

      return DS.PromiseObject.create({
               promise: this.get('store').find('user', userId)
             });
    }
  }.property('isAuthenticated')
});

