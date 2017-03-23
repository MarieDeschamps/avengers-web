import MovieItemComponent from './movie-item-component';

export function MovieListComponent(movieDataService) {
    //creer element racine (arbre DOM) a partir template
    this.movieDataService = movieDataService;
    this.el = $(`<div>Bonjour</div>`);
}

MovieListComponent.prototype = {
    rootNode: function () {
        return this.el;
    },

    start: function () {
        //charger les donnees
        this.movieDataService.getAll()
            .then(movies => {
                //afficher donnees
                for (let movie of movies) {
                    let movieItemComponent = new MovieItemComponent();
                    movieItemComponent.setMovie(movie);
                    this.el.append(movieItemComponent.rootNode());
                }
            });
    }
}

export default MovieListComponent;