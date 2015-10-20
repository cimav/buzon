import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.createRecord('post');
  },
  renderTemplate: function() {
    this.render('posts/new', {
      into: 'application'
    });
  },
  setupController: function(controller, model) {
    model.set('post_type', 'sugerencia');
    this._super(controller, model);
    controller.set('groups', this.store.findAll('group'));
  }
});