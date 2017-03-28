export function ListComponent(){
}

ListComponent.prototype = {
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