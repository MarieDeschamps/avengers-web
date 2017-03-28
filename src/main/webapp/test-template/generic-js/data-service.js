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
        fetch(this.path,
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
        fetch(path + '/' + firstID + '/' + secondID, { method: "POST" });
    },

    delete: function (id) {
        fetch(this.path + '/' + id, { method: "delete" });
    }
}

export default DataService;