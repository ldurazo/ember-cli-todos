import Ember from 'ember';

var TodosController = Ember.ArrayController.extend({
    actions: {
        createTodo: function(){
            var title = this.get('newTitle');
            var todo = this.store.createRecord('todo', {
                title: title,
                isCompleted: false
            });
            this.set('newTitle', '');
            todo.save();
        }
    },

        remaining: function() {
            return this.filterBy('isCompleted', false).get('length');
        }.property('@each.isCompleted'),

        inflection: function() {
            var remaining = this.get('remaining');
            return (remaining === 1) ? 'item' : 'items';
        }.property('remaining'),

        allAreDone: function(key, value) {
            console.log(key + ": " + value);
            if (value === undefined) {
                return this.get('length') > 0 && this.isEvery('isCompleted', true);
            } else {
                this.setEach('isCompleted', value);
                this.invoke('save');
                return value;
            }
        }.property('@each.isCompleted')
});

export default TodosController;
