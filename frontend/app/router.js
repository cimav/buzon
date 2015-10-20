import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {});
  this.route('posts', { path: "/" }, function() {
    this.route('new', {path: '/nueva'});
    this.resource("post", { path: "/:post_id" });
  });
});

export default Router;
