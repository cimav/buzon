import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true}),
  group: DS.belongsTo('group', {async: true}),
  users: DS.hasMany('user', {async: true}),
  responses: DS.hasMany('response', {async: true}),
  comments: DS.hasMany('comment', {async: true}),
  post_type: DS.attr('string'),
  subject: DS.attr('string'),
  body: DS.attr('string'),
  publish_date: DS.attr('string'),
  supporters_count: DS.attr('number'),
  comments_count: DS.attr('number'),
  formatted_date: function() {
    var date = this.get('publish_date');
    return moment(date).format('MMM D YYYY, h:mm a');
  }.property('publish_date')
});
