import MovieListComponent from './movieList';
import Template from '../../generic-js/template-html';
import characterListForitem from '../../Character/js/characterListToBeSelected';


$(document).ready(function () {
	let depth = 2;
	let template = new Template("Movie",depth);
    
    $('head').append(template.template_head());
    $('header').append(template.template_header());
    $('body').append(template.template_body());

    $('button#submit').before(`<label>Title: <input type="text" name="title" required="required"></label><br/>
	<fieldset><legend>Characters in the movie</legend>
	</fieldset>`);

    let component = new MovieListComponent(depth);
	component.fetchAndDisplay()

	characterListForitem("create",null,depth);
});