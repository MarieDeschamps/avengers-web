function MovieListComponent() {

}

MovieListComponent.prototype = {
	fetchAll: function () {
		return $.get("marvel/movies")
			//.then(resp => resp.json())
			.then(json => {
				this.collection = [];
				json.forEach(data => {
					const movie = new MovieItem(data, this);
					this.collection.push(movie);
				});

				return this.collection;
			});
	},
	render: function (movies) {
		const template = `
        <div class="listing">
                
        </div>`;

		// cached component JQueryfied element
		this.$el = $(template);
		console.log(this.$el);

		this.collection.forEach(movie => this.$el.append(movie.render()));
		console.log("debug:");
		console.log(this.$el);

		$('body').find('h2.moviesList').after(this.$el);
	},
	create: function () {
		var me = this;
		console.log("button created");
		button = $("button#submit");
		button.on("click", function (event) {
			console.log("click done");
			let movie = {
				movie_title: $('input[name=title]').val()
			}
			let casting = [];
			$("input[name='characterId']:checked").each(function () {
				casting.push($(this).val());
			});

			console.log("creation of : ", movie);
			console.log("charactersId:", casting);

			fetch('marvel/movies',
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify(movie)
				})
				.then(response => {
					response.json().then(json => {
						console.log(json);
						movie = new MovieItem(json, me);
					})
					.then(response => {
						casting.forEach(characterId => {
							fetch('marvel/movies/' + movie.movie_id + '/' + characterId, { method: "POST" });
						});
					})
					.then(response => { me.add(movie) });
				})
		});
	},
	add: function (movie) {
		console.log(movie.movie_id);
		this.collection.push(movie);
		this.$el.append(movie.render());
		console.log(this.$el);
		return this.collection;
	}
}

function MovieItem(data, listComponent) {
	Object.assign(this, data);
	this.listComponent = listComponent;
	this.collection = listComponent.collection;
}

MovieItem.prototype = {
	render: function () {
		const template = `
            <div class="element"><a href="./${this.movie_title}.html">
                <div class="info">${this.movie_title}</div>
				</a>
				<button>DELETE</button>
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
	}

}