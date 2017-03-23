

export function ListComponent(path){
	this.path = path
}

ListComponent.prototype = {
	getAll: function (path) {
		return $.get(this.path)
			.then(json => {
				this.collection = [];
				json.forEach(data => {
					this.collection.push(data);
				});

				return this.collection;
			});
	},
	render: function () {
		const template = `
        <div class="listing">
                
        </div>`;

		// cached component JQueryfied element
		this.$el = $(template);
		console.log(this.$el);

		this.collection.forEach(item => this.$el.append(item.render()));
		console.log("debug:");
		console.log(this.$el);

		$('body').find('h2.list').after(this.$el);
	},
	create: function () {
	},
	add: function (item) { //generique
		this.collection.push(item);
		this.$el.append(item.render());
		console.log(this.$el);
		return this.collection;
	}
}

export default ListComponent;