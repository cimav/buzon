import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://sugerencias.cimav.edu.mx',
  headers: function() {
    return {
      "X-XSRF-TOKEN": decodeURIComponent(Ember.get(document.cookie.match(/XSRF\-TOKEN\=([^;]*)/), "1"))
    };
  }.property().volatile()
});
