

export function MovieItemComponent(movieDataService) {
    //creer element racine (arbre DOM) a partir template
    this.el = $(`
        <div>
            <span class = "id"></span>
            <span class = "name"></span>
        </div>
    `);
}

MovieItemComponent.prototype = {
    rootNode: function () {
        return this.el;
    },

    setMovie: function(movie){
        this.el.find('.id').text(movie.movie_id);
        this.el.find('.name').text(movie.movie_title);
    }
}

export default MovieItemComponent;