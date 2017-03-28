import {CharacterListComponent} from './characterList';

$(document).ready(function(){
	let component = new CharacterListComponent();
	component.fetchAll().then(component.render.bind(component));
	component.create();
});