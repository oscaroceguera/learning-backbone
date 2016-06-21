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

var PersonView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#personTemplate').html()),
	initialize: function () {
		this.render()
	},
	render: function() {
		this.$el.html(
			this.template(this.model.toJSON())
		)
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
