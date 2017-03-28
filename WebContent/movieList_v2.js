import ListComponent from './listComponent';
import MovieItem from './movieItem';
import render from './render';

export function MovieListComponent() {
	this.path = "marvel/movies";
	this.listComponentGen = new ListComponent(this.path);
}

MovieListComponent.prototype = {
	fetchAndDisplay: function () {
		// charger les donnees
		$.get(this.path)
			.then(movies => {
				// puis les afficher
				this.collection = [];
				movies.forEach(elem => {
					const item = new MovieItem(elem, this);
					this.collection.push(item);
				});

				this.render();
				this.create();
			});
	},
	create: function () {
		var me = this;
		console.log("button created");
		let button = $("button#submit");
		button.on("click", function (event) {
			console.log("click done");
			let item = fillMovie();
			let casting = fillCastingForMovie();

			console.log("creation of : ", item);
			console.log("charactersId:", casting);

			fetch(this.path,
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify(item)
				})
				.then(response => {
					response.json().then(json => {
						console.log(json);
						item = new MovieItem(json, me);
					})
						.then(response => {
							casting.forEach(id => {
								fetch(me.path + item.id + '/' + id, { method: "POST" });
							});
						})
						.then(response => { me.add(item) });
				})
		});
	},
}

MovieListComponent.prototype.render = ListComponent.prototype.render;
MovieListComponent.prototype.add = ListComponent.prototype.add;

function fillMovie() {
	return {
		movie_title: $('input[name=title]').val()
	};
}

function fillCastingForMovie() {
	let casting = [];
	$("input[name='characterId']:checked").each(function () {
		casting.push($(this).val());
	});
	return casting;
}

export default MovieListComponent;