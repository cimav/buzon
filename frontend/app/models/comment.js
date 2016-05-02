import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true}),
  post: DS.belongsTo('post', {async: true}),
  body: DS.attr('string'),
  publish_date: DS.attr('string'),
  formatted_date: function() {
    var date = this.get('publish_date');
    return moment(date).fromNow();
  }.property('publish_date')
});
