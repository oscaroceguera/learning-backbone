var Person = Backbone.Model.extend({
	defaults: {
		name: 'Osacr Oceguera',
		age: 25,
		occupation: 'Worker'
	}
})

var PeopleCollection = Backbone.Collection.extend({
	model: Person
})

// View for all people
var PeopleView = Backbone.View.extend({
	tagName: 'ul',
	render: function () {
		// must do certain things as specified above.
		//Loop over all the person objects
		this.collection.each(function(person){
			var personView = new PersonView({
				model: person
			})

			this.$el.append(personView.render().el)
			console.log(this); // referencing to global window object and its pretty useless..
		}, this) // at this point we are passing context.. Underscore provides this functionality..

		return this; // returning this for chaining..
	}
})

var PersonView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#personTemplate').html()),
	render: function() {
		this.$el.html(
			this.template(this.model.toJSON())
		)

		return this;  // returning this from render method..
	}
})


var peopleCollection = new PeopleCollection([
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

var peopleView = new PeopleView({
	collection: peopleCollection
})

$(document.body).append(peopleView.render().el)
