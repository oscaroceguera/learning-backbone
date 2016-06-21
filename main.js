var Person = Backbone.Model.extend({
	defaults: {
		name: 'Osacr Oceguera',
		age: 25,
		occupation: 'Worker'
	}
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
