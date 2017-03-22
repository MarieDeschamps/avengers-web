export function CharacterListComponent() {

}

CharacterListComponent.prototype = {
	fetchAll: function () {
		return $.get("marvel/heroes")
			//.then(resp => resp.json())
			.then(json => {
				this.collection = [];
				json.forEach(data => {
					const character = new CharacterItem(data, this);
					this.collection.push(character);
				});

				return this.collection;
			});
	},
	render: function (characters) {
		const template = `
        <div class="listing">
                
        </div>`;

		// cached component JQueryfied element
		this.$el = $(template);
		console.log(this.$el);

		this.collection.forEach(character => this.$el.append(character.render()));
		console.log("debug:");
		console.log(this.$el);

		$('body').find('h2.charactersList').after(this.$el);
	},
	create: function () {
		let me = this;
		console.log("button created");
		let button = $('button#submit');
		button.on("click", function (event) {
			console.log("click done");
			const hero = {
				alias: $('input[name=alias]').val(),
				realName: $('input[name=realName]').val(),
				abilities: $('input[name=abilities]').val()//,
				//picture : $('input[name=picture]').val()
			}
			console.log("creation of : ", hero);

			fetch('marvel/heroes',
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify(hero)
				})
				.then(response => {
					response.json().then(json => {
						console.log(json);
						const character = new CharacterItem(json, me);
						me.add(character);
					})
			});
		});
	},
	add: function(hero){
		console.log(hero.id);
		this.collection.push(hero);
		this.$el.append(hero.render());
		console.log(this.$el);
		return this.collection;
	}
}

function CharacterItem(data, listComponent) {
	Object.assign(this, data);
	this.listComponent = listComponent;
	this.collection = listComponent.collection;
}

CharacterItem.prototype = {
	render: function () {
		const template = `
            <div class="element"><a href="./${this.alias}.html">
                <!--<div class="photo"> <img src="../../images/spiderman.png" alt="Spiderman picture"> </div>-->
                <div class="info">${this.alias}</div>
				</a>
				<button class="del">DELETE</button>
            </div>`;
		// element JQueryfied
		this.$el = $(template);
		console.log(this.$el);
		// Catch the button without reading all DOM with find()
		const button = this.$el.find("button").on('click', evt => this.remove());

		return this.$el;
	},
	remove: function () {
		console.log("delete character " + this.alias);
		fetch("marvel/heroes/" + this.id, { method: "delete" }).catch(error => application());

		//remove ul
		this.listComponent.characters = this.listComponent.collection.filter(c => c.id !== this.id);
		this.$el.remove();
		console.log(this.$el);
		return this.$el;
	}

}

export default CharacterListComponent;