import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  short_name: DS.attr('string'),
  user_id: DS.attr('number'),
  posts: DS.hasMany('post', {async: true})
});
