import MovieDataService from './movie-data-service';
import MovieListComponent from './movie-list-component';

$(function () {
    const movieDataService = new MovieDataService();
    const movieListComponent = new MovieListComponent(movieDataService);
    
    //inserer composant a la page
    $('body').append(movieListComponent.rootNode());

    //demarrer composant
    movieListComponent.start();
});