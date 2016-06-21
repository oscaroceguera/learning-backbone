var Person = Backbone.Model.extend({
	defaults: {
		name: 'Osacr Oceguera',
		age: 25,
		occupation: 'Worker'
	},
	work: function () {
		return this.get('name') + 'is working'
	}
})
