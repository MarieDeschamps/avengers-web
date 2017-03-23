export function MovieDataService() {
    this.path = "../marvel/movies";
}

MovieDataService.prototype = {
    getAll: function () {
        return $.get(this.path);
    },

    update: function () {
    },

    create: function () {
    },

    delete: function () {
    }
}

export default MovieDataService;