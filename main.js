(function(){
	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	window.templateHelper = function(id){
		return _.template( $('#' + id).html() );
	};
})();

App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'Osacr Oceguera',
		age: 25,
		occupation: 'Worker'
	}
})

App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
})

// View for all people
App.Views.People = Backbone.View.extend({
	tagName: 'ul',
	initialize: function (){
		this.collection.on('add', this.addOne, this)
	},
	render: function () {
		this.collection.each(this.addOne, this)
		return this
	},

	addOne: function (person) {
		var personView = new App.Views.Person({ model: person });
		this.$el.append(personView.render().el);
	},
})

App.Views.Person = Backbone.View.extend({
	tagName: 'li',
	template: templateHelper('personTemplate'),
	events: {
		'click .edit' : 'editPerson',
		'click .delete' : 'DestroyPerson'
	},

	initialize: function () {
		this.model.on('change', this.render, this)
		this.model.on('destroy', this.remove, this);
	},

	editPerson: function () {
		var newName = prompt("Please enter the new name", this.model.get('name'));

		if (!newName) return

		this.model.set('name', newName);
	},

	DestroyPerson: function(){
		this.model.destroy();  // 2. calling backbone js destroy function to destroy that model object
	},

	remove: function(){
		this.$el.remove();  // 4. Calling Jquery remove function to remove that HTML li tag element..
	},

	render: function() {
		this.$el.html(
			this.template(this.model.toJSON())
		)

		return this;  // returning this from render method..
	}
})

App.Views.AddPerson = Backbone.View.extend({
	el: '#addPerson',

	events: {
		'submit': 'submit'  // binding submit click to submit function..
	},

	submit: function(e){
		e.preventDefault();  // preventing default submission..
		var newPersonName = $(e.currentTarget).find('input[type=text]').val();  // getting new form values..
		var person = new App.Models.Person({ name: newPersonName });// creating a new person object..
		this.collection.add(person); // adding this to current collection..

	}
});


var peopleCollection = new App.Collections.People([
	{
		name: 'Mohit Jain',
		age: 26
	},
	{
		name: 'Taroon Tyagi',
		age: 25,
		occupation: 'web designer'
	},
	{
		name: 'Rahul Narang',
		age: 26,
		occupation: 'Java Developer'
	}
]);

var addPersonView = new App.Views.AddPerson({
	collection: peopleCollection
});

var peopleView = new App.Views.People({
	collection: peopleCollection
})

$(document.body).append(peopleView.render().el)
