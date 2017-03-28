import CharacterListComponent from './characterList';

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

export function characterListForitem(status, item, depth) {
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
					let itemHeroesID = item.heroes.map(h => h.id);
					if (itemHeroesID.includes(character.id)) {
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

export default characterListForitem;