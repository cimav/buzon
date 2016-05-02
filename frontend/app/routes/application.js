import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  model: function() {
    return this.get('session').get('account');
  },
  actions: {
    login: function() {
      var self = this;
      this.get('session').authenticate('authenticator:torii', 'google-token').then(function(){
        console.log('Logged in');
      }, function(error){
         alert(JSON.stringify(error, null, 4));
         alert('Error al iniciar sesión: ' + error.message);
      });
      return;
    },
    invalidateSession: function() {
      this.transitionTo('login');
      this.get('session').invalidate();
    }
  }

});
