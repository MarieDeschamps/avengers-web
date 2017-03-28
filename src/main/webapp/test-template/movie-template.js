import MovieListComponent from './movieList_v2';
import CharacterListComponent from './characterList';
import Template from './template-html';

function characterRender(character, checked) {
	let template;
	if (checked === true) {
		template = `<label><input type="checkbox" name="characterId" value="${character.id}" checked> ${character.alias}</label><br/>`;
	} else {
		template = `<label><input type="checkbox" name="characterId" value="${character.id}"> ${character.alias}</label><br/>`;
	}
	// element JQueryfied
	let output = $(template);
	console.log(output);
	return output;
}

function characterListForMovie(status, movie, depth) {
	let characterList = new CharacterListComponent(depth);
	characterList
		.fetchAll()
		.then(characterList => {
			const template = `<div></div>`;

			// cached component JQueryfied element
			let output = $(template);
			console.log(output);

			if (status === "modify") {
				characterList.forEach(character => {
					let movieHeroesID = movie.heroes.map(h => h.id);
					if (movieHeroesID.includes(character.id)) {
						output.append((characterRender(character, true)));
					} else {
						output.append((characterRender(character, false)));
					}
				});
			} else {
				characterList.forEach(character => output.append(characterRender(character, false)));
			}

			console.log("debug:");
			console.log(output);

			$('body').find('fieldset legend').after(output);
		});
}

$(document).ready(function () {
	let depth = 1;
	let template = new Template("Movie",depth);
    
    $('head').append(template.template_head());
    $('header').append(template.template_header());
    $('body').append(template.template_body());

    $('button#submit').before(`<label>Title: <input type="text" name="title" required="required"></label><br/>
	<fieldset><legend>Characters in the movie</legend>
	</fieldset>`);

    let component = new MovieListComponent(depth);
	component.fetchAndDisplay()

	characterListForMovie("create",null,depth);
});