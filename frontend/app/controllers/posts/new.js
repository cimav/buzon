import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  post_types: ['sugerencia', 'queja', 'denuncia'],

  validateGroup: function() {
    var g = $('#group-select').val();
    if(g == "0") {
      $('#error-no-grupo').fadeIn();
      return false;
    } else {
      $('#error-no-grupo').fadeOut();
      return true;
    }
  },

  validateSubject: function() {
    var s = this.get('model.subject'); 
    if (!s) {
      $('#error-no-subject').fadeIn();
      return false;
    } else {
      $('#error-no-subject').fadeOut();
      return true;
    }
  },

  validateBody: function() {
    var b = this.get('model.body'); 
    if (!b) {
      $('#error-no-body').fadeIn();
      return false;
    } else {
      $('#error-no-body').fadeOut();
      return true;
    }
  },

  validateAll: function() {
    var v1 = this.validateSubject();
    var v2 = this.validateGroup();
    var v3 = this.validateBody();
    return v1 && v2 && v3;
  },

  onSelectedGroupChange:function(){
    this.validateGroup();  
  }.observes('selectedGroup'),

  actions: {
    selectGroup: function(value, component) {
      this.set('model.group', value);
      this.validateGroup(); 
    },
    addNewPost: function() {
      var post = this.get('model');
      var self = this;
      var old_html_button = $('#add-new-button').html();

      post.set('user', this.get('session.account.content'));

      if (!this.validateAll()) {
        $("#post-new-div").effect("shake");
        return false;
      }

      $('#add-new-button').html('Enviando...');
      $('#add-new-button').prop( "disabled", true);

      post.save().then(
        function(np) {
          self.transitionToRoute('post', np.id);
          self.get('model').reload();
          $('#add-new-button').html(old_html_button);
          $('#add-new-button').prop( "disabled", false);
        },
        function(np) {
          alert('Error al agregar nueva');
          $('#add-new-button').html(old_html_button);
          $('#add-new-button').prop( "disabled", false);
        }
      );
    }
  }
});
