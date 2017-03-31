export function DataService(path) {
    this.path = path;
}

DataService.prototype = {
    getAll: function () {
        return $.get(this.path);
    },

    update: function () {
    },

    create: function (item) {
        return fetch(this.path,
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify(item)
				})
    },

    associate: function(path,firstID,secondID) {
        return fetch(path + '/' + firstID + '/' + secondID, { method: "POST" });
    },

    delete: function (id) {
        return fetch(this.path + '/' + id, { method: "delete" });
    }
}

export default DataService;