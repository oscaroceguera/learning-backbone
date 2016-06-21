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
	render: function () {
		// must do certain things as specified above.
		//Loop over all the person objects
		this.collection.each(function(person){
			var personView = new App.Views.Person({
				model: person
			})

			this.$el.append(personView.render().el)
			console.log(this); // referencing to global window object and its pretty useless..
		}, this) // at this point we are passing context.. Underscore provides this functionality..

		return this; // returning this for chaining..
	}
})

App.Views.Person = Backbone.View.extend({
	tagName: 'li',
	template: templateHelper('personTemplate'),
	render: function() {
		this.$el.html(
			this.template(this.model.toJSON())
		)

		return this;  // returning this from render method..
	}
})


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

var peopleView = new App.Views.People({
	collection: peopleCollection
})

$(document.body).append(peopleView.render().el)
