import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    return this.store.find('post', params.post_id);
  },
  renderTemplate: function() {
    this.render('post', {
      into: 'application'
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('newComment', this.store.createRecord('comment'));
    controller.set('newResponse', this.store.createRecord('response'));
    controller.set('groups', this.store.findAll('group'));
  }
});
