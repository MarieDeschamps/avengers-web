
let component;
$(document).ready(function(){
	component = new CharacterListComponent();
	component.fetchAll().then(component.render.bind(component));
	component.create();
});