
function characterRender(character) {
	const template = `<label><input type="checkbox" name="characterId" value="${character.id}"> ${character.alias}</label><br/>`;
	// element JQueryfied
	this.$el = $(template);
	console.log(this.$el);
	return this.$el;
}

function characterListForMovie (){
	let characterList = new CharacterListComponent();
	characterList
		.fetchAll()
		.then(characterList => {
			const template = `<div></div>`;

				// cached component JQueryfied element
				output = $(template);
				console.log(output);

				characterList.forEach(character => output.append(characterRender(character)));
				console.log("debug:");
				console.log(output);

				$('body').find('fieldset legend').after(output);
		});
}

let component;
$(document).ready(function(){
	component = new MovieListComponent();
	component.fetchAll().then(component.render.bind(component)).then(component.create());
	characterListForMovie();

});