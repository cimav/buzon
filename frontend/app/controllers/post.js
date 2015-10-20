import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  currentUserCanAnswerThis: function() {
    return this.get('model.group.user_id') == this.get('session.account.content.id'); 
  }.property('session.account', 'model.group'),

  currentUserSupportThis: function() {
    return this.get('model.user.id') == this.get('session.account.content.id') ||
           this.get('model.users').contains(this.get('session.account.content'));
  }.property('session.account', 'model.users'),
  
  showComments: function() {
    return this.get('model.user.id') == this.get('session.account.content.id') ||
           this.get('model.users').contains(this.get('session.account.content')) || 
           this.get('content.comments');
  }.property('model.users'),
  
  actions: {
    support: function() {
      var self = this;
      var newSupporter = this.store.createRecord('supporter');
      newSupporter.set('user', this.get('session.account.content'));
      newSupporter.set('post', this.get('model'));
      newSupporter.save().then(
        function(ns) {
          // Success
          self.get('model').reload();
        },
        function(ns) {
          // Fail
          alert('Error al agregar nuevo apoyo');
        }
      );
    },

    addNewResponse: function() {
      var response = this.get('newResponse');
      var self = this;
      response.set('user', this.get('session.account.content'));
      response.set('post', this.get('model'));
      response.save().then(
        function(nc) {
          self.set('newResponse', self.store.createRecord('response'));
          self.get('model').reload();
        },
        function(nc) {
          alert('Error al agregar nueva respuesta');
        }
      );
    },

    addNewComment: function() {
      var comment = this.get('newComment');
      var self = this;
      comment.set('user', this.get('session.account.content'));
      comment.set('post', this.get('model'));
      comment.save().then(
        function(nc) {
          self.set('newComment', self.store.createRecord('comment'));
          self.get('model').reload();
        },
        function(nc) {
          alert('Error al agregar nuevo comentario');
        }
      );
    }
  }
});
