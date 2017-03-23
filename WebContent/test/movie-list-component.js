import MovieItemComponent from './movie-item-component';

export function MovieListComponent(movieDataService) {
    //create the root element from a template
    this.el = $(`
        <div>Bonjour</div>
    `);
    this.movieDataService = movieDataService;
}

MovieListComponent.prototype = {
    rootNode: function () {
        return this.el;
    },

    load: function () {
        //load the data
        this.movieDataService.getAll()
            .then(movies => {
                for (let movie of movies) {
                    let movieItemComponent = new MovieItemComponent();
                    movieItemComponent.setMovie(movie);
                    this.el.append(movieItemComponent.rootNode());
                }
            })
    }
}

export default MovieListComponent;