import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  renderTemplate: function() {
    this.render('login', {
      into: 'application'
    });
  }
});
