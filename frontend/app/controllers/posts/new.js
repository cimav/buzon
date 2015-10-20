import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  post_types: ['sugerencia', 'queja', 'denuncia'],
  actions: {
    addNewPost: function() {
      var post = this.get('model');
      var self = this;
      post.set('user', this.get('session.account.content'));
      post.save().then(
        function(np) {
          self.transitionTo('post', np.id);
          self.get('model').reload();
        },
        function(np) {
          alert('Error al agregar nueva');
        }
      );
    }
  }
});
