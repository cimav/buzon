import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  OPEN: 1,
  CLOSED: 2,

  currentUserCanAnswerThis: function() {
    if (this.get('model.status') == this.CLOSED) {
      return false;
    }
    return this.get('model.group.user_id') == this.get('session.account.content.id'); 
  }.property('session.account', 'model.group'),

  currentUserSupportThis: function() {
    if (this.get('model.status') == this.CLOSED) {
      return false;
    }
    return this.get('model.user.id') == this.get('session.account.content.id') ||
           this.get('model.users').contains(this.get('session.account.content'));
  }.property('session.account', 'model.users'),
  
  showComments: function() {
    return this.get('model.user.id') == this.get('session.account.content.id') ||
           this.get('model.users').contains(this.get('session.account.content')) || 
           this.get('content.comments');
  }.property('model.users'),

  isClosed: function() {
    var post = this.get('model');
    return post.get('status') == this.CLOSED;
  }.property('model.status'),

  validateResponse: function() {
    var response = this.get('newResponse.body');
    if (!response) {
      $('#error-no-respuesta').fadeIn();
      return false;
    } else {
      $('#error-no-respuesta').fadeOut();
      return true;
    }
  },

  validateComment: function() {
    var response = this.get('newComment.body');
    if (!response) {
      $('#error-no-aportacion').fadeIn();
      return false;
    } else {
      $('#error-no-aportacion').fadeOut();
      return true;
    }
  },

  addNewResponse: function() {
    var response = this.get('newResponse');
    var self = this;
    if (!this.validateResponse()) {
      return false;
    }
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

  closePost: function() {
    var post = this.get('model');
    var self = this;
    post.status = this.CLOSED;
    post.save().then(
      function(p) {
        self.get('model').reload();
      },
      function(p) {
        alert('Error al agregar cerrar');
      }
    );
    alert(this.CLOSED);
  },
  
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
      this.addNewResponse(false);
    },

    addNewResponseAndClose: function() {
      this.addNewResponse(true);
    },

    closePost: function() {
      this.closePost();
    },

    addNewComment: function() {
      var comment = this.get('newComment');
      var self = this;
      if (!this.validateComment()) {
        return false;
      }
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
