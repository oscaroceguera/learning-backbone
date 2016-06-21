var Person = Backbone.Model.extend({
	defaults: {
		name: 'Osacr Oceguera',
		age: 25,
		occupation: 'Worker'
	}
})

var PersonView = Backbone.View.extend({
	tagName: 'li',
	my_template: _.template("<strong><%= name %></strong> (<%= age %>) - <%= occupation %>"),
	initialize: function () {
		this.render()
	},
	render: function() {
		this.$el.html(
			this.my_template(this.model.toJSON())
		)
	}
})
