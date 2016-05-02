import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'), 
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  //posts: DS.hasMany('post', {async: true}),
  full_name: function() {
    return this.get('first_name') + ' ' + this.get('last_name');
  }.property('first_name', 'last_name'),
  picture_url: function() {
    var email = this.get('email') + '';
    var url = 'http://cimav.edu.mx/foto/' + email.split('@')[0] + '/48';
    return url;
  }.property('email')
});
