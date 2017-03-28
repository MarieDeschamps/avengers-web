import DataService from '../../generic-js/data-service';

export function MovieItem(data, listComponent) {
	Object.assign(this, data);
	this.listComponent = listComponent;
	this.collection = listComponent.collection;
	this.dataService = new DataService(this.path);
	this.id = this.movie_id;
	this.templateForListing = `
            <div class="element"><a href="./${this.movie_title}.html">
                <div class="info">${this.movie_title}</div>
				</a>
				<button class="del">DELETE</button>
            </div>`;
}

MovieItem.prototype = {
	render: function () {
		// element JQueryfied
		this.$el = $(this.templateForListing);
		console.log(this.$el);
		// Catch the button without reading all DOM with find()
		const button = this.$el.find("button").on('click', evt => this.remove());

		return this.$el;
	},
	remove: function () {
		console.log("delete movie " + this.movie_title);
		this.dataService.delete(this.id);

		//remove ul
		this.listComponent.movies = this.listComponent.collection.filter(c => c.id !== this.id);
		this.$el.remove();
		console.log(this.$el);
		return this.$el;
	},
	modify: function () {
		const template = `
			<h2>MODIFY MOVIE ${this.movie_title}</h2>
			
			<form>
			<label>Title: <input type="text" name="title" required="required" value="${this.movie_title}></label><br/>
			<fieldset><legend>Characters in the movie</legend>
			</fieldset>
			<button type="button" id="submit">Create a new movie</button>
			</form>`;

	}

}

export default MovieItem;