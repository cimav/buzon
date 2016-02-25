import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(RouteMixin, AuthenticatedRouteMixin, {
  perPage: 20,
  model: function(params) {
    params['user_id'] = this.get('session.account.content.id');
    return this.findPaged('post',params);
  }
});