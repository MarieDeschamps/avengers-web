export function MovieDataService(path) {
    this.path = path;
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