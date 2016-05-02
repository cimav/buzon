import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  new_group: null,
  OPEN: 1,
  CLOSED: 2,

  currentUserCanAnswerThis: function() {
    if (this.get('model.status') == this.CLOSED) {
      return false;
    }
    return this.get('model.group.user_id') == this.get('session.account.content.id'); 
  }.property('session.account', 'model.group', 'model.status'),

  currentUserSupportThis: function() {
    if (this.get('model.status') == this.CLOSED) {
      return false;
    }
    return this.get('model.user.id') == this.get('session.account.content.id') ||
           this.get('model.users').contains(this.get('session.account.content'));
  }.property('session.account', 'model.users', 'model.status'),
  
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

  addNewResponse: function(close_post) {
    var response = this.get('newResponse');
    var post = this.get('model');
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

    if (close_post) {
      post.set('status', this.CLOSED);

      post.save().then(
        function(p) {
          self.get('model').reload();
        },
        function(p) {
          alert('Error al cerrar');
        }
      );
    }
  },

  closePost: function() {
    var post = this.get('model');
    var response = this.get('newResponse');
    var self = this;

    post.set('status', this.CLOSED);

    post.save().then(
      function(p) {
        self.get('model').reload();
      },
      function(p) {
        alert('Error al cerrar');
      }
    );

    response.set('user', self.get('session.account.content'));
    response.set('post', self.get('model'));
    response.set('body', 'Se ha cerrado la ' + self.get('model.post_type'));
    response.save().then(
      function(nc) {
        self.set('newResponse', self.store.createRecord('response'));
      },
      function(nc) {
        alert('Error al agregar comentario de cierre');
      }
    );
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
    },

    openReassignBox: function() {
      $('#answer-box').fadeOut(500,  function() { $('#reassign-box').fadeIn(); });
    },

    closeReassignBox: function() {
      $('#reassign-box').fadeOut(500,  function() { $('#answer-box').fadeIn(); });
    },

    selectReassignGroup: function(value, component) {
      this.set('new_group', value);
    },

    reassignPost: function() {
      var post = this.get('model');
      var response = this.get('newResponse');
      var self = this;

      if(this.new_group == "0") {
        $('#error-no-grupo').fadeIn();
        return false;
      }

      response.set('user', self.get('session.account.content'));
      response.set('post', self.get('model'));
      response.set('body', 'Se reasignó de "' + self.get('model.group.name') + '" a "' + self.get('new_group.name') + '"')
      response.save().then(
        function(nc) {
          self.set('newResponse', self.store.createRecord('response'));
          $('#reassign-box').fadeOut(500,  function() { $('#answer-box').fadeIn(); });
        },
        function(nc) {
          alert('Error al agregar nuevo comentario');
        }
      );

      post.set('group', this.new_group);
      
      post.save().then(
        function(p) {
          self.get('model').reload();
        },
        function(p) {
          alert('Error al reasignar');
        }
      );
      
    }
  }
});
