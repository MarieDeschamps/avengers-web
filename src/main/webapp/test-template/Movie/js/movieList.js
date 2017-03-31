import ListComponent from '../../generic-js/listComponent';
import MovieItem from './movieItem';
import depthToString from '../../generic-js/depthToString';
import DataService from '../../generic-js/data-service';

export function MovieListComponent(depth) {
	this.path = depthToString(depth) + "marvel/movies";
	this.dataService = new DataService(this.path);
	this.id = this.movie_id;
}

MovieListComponent.prototype = {
	fetchAndDisplay: function () {
		// charger les donnees
		this.dataService.getAll()
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
		//button to can create
		let button = $("button#submit");
		console.log("button created");
		button.on("click", function (event) {
			console.log("click done");
			let movie = {
				movie_title: $('input[name=title]').val()
			};
			let casting = fillCastingForMovie();

			console.log("creation of : ", movie);
			console.log("link to charactersId:", casting);

			me.dataService.create(movie)
				.then(response => {
					response.json().then(json => {
						console.log(json);
						movie = new MovieItem(json, me);
					})
						.then(response => {
							casting.forEach(id => {
								this.dataService.associate(me.path, movie.id, id);
							});
						})
						.then(response => { me.add(movie) });
				})
		});
	},
}

MovieListComponent.prototype.render = ListComponent.prototype.render;
MovieListComponent.prototype.add = ListComponent.prototype.add;

function fillCastingForMovie() {
	let casting = [];
	$("input[name='characterId']:checked").each(function () {
		casting.push($(this).val());
	});
	return casting;
}

export default MovieListComponent;