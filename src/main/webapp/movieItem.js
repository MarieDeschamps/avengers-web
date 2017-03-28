export function MovieItem(data, listComponent) { //generique
	Object.assign(this, data);
	this.listComponent = listComponent;
	this.collection = listComponent.collection;
	this.id = this.movie_id;
}

MovieItem.prototype = {
	render: function () {
		const template = `
            <div class="element"><a href="./${this.movie_title}.html">
                <div class="info">${this.movie_title}</div>
				</a>
				<button class="del">DELETE</button>
            </div>`;
		// element JQueryfied
		this.$el = $(template);
		console.log(this.$el);
		// Catch the button without reading all DOM with find()
		const button = this.$el.find("button").on('click', evt => this.remove());

		return this.$el;
	},
	remove: function () {
		console.log("delete movie " + this.movie_title);
		fetch("marvel/movies/" + this.movie_id, { method: "delete" }).catch(error => application());

		//remove ul
		component.movies = component.collection.filter(c => c.movie_id !== this.movie_id);
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