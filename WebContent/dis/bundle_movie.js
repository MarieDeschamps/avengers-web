/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CharacterListComponent */
function CharacterListComponent() {

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

/* harmony default export */ __webpack_exports__["a"] = (CharacterListComponent);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listComponent__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__movieItem__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render__ = __webpack_require__(5);
/* unused harmony export MovieListComponent */




function MovieListComponent() {
	this.path = "marvel/movies";
	this.listComponentGen = new __WEBPACK_IMPORTED_MODULE_0__listComponent__["a" /* default */](this.path);
}

MovieListComponent.prototype = {
	fetchAndDisplay: function () {
		// charger les donnees
		$.get(this.path)
			.then(movies => {
				// puis les afficher
				this.collection = [];
				movies.forEach(elem => {
					const item = new __WEBPACK_IMPORTED_MODULE_1__movieItem__["a" /* default */](elem, this);
					this.collection.push(item);
				});

				this.render();
				this.create();
			});
	},
	/*render: function (items) {
		this.$el = render(items, this.collection);
	},*/
	create: function () {
		var me = this;
		console.log("button created");
		let button = $("button#submit");
		button.on("click", function (event) {
			console.log("click done");
			let item = fillMovie();
			let casting = fillCastingForMovie();

			console.log("creation of : ", item);
			console.log("charactersId:", casting);

			fetch(this.path,
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify(item)
				})
				.then(response => {
					response.json().then(json => {
						console.log(json);
						item = new __WEBPACK_IMPORTED_MODULE_1__movieItem__["a" /* default */](json, me);
					})
						.then(response => {
							casting.forEach(id => {
								fetch(me.path + item.id + '/' + id, { method: "POST" });
							});
						})
						.then(response => { me.add(item) });
				})
		});
	},
	add: function (item) { //generique
		this.listComponentGen.add(item).bind(item);
	}
}

MovieListComponent.prototype.render = __WEBPACK_IMPORTED_MODULE_0__listComponent__["a" /* default */].prototype.render;

function fillMovie() {
	return {
		movie_title: $('input[name=title]').val()
	};
}

function fillCastingForMovie() {
	let casting = [];
	$("input[name='characterId']:checked").each(function () {
		casting.push($(this).val());
	});
	return casting;
}

/* harmony default export */ __webpack_exports__["a"] = (MovieListComponent);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__movieList_v2__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__characterList__ = __webpack_require__(0);



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

function characterListForMovie(status, movie) {
	let characterList = new __WEBPACK_IMPORTED_MODULE_1__characterList__["a" /* default */]();
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
	let component = new __WEBPACK_IMPORTED_MODULE_0__movieList_v2__["a" /* default */]();
	component.fetchAndDisplay();

	//characterListForMovie();

});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ListComponent */


function ListComponent(path){
	this.path = path
}

ListComponent.prototype = {
	fetchAll: function (path) { //generique
		return $.get(this.path)
			.then(json => {
				this.collection = [];
				json.forEach(data => {
					this.collection.push(data);
				});

				return this.collection;
			});
	},
	render: function (item) { //generique
		const template = `
        <div class="listing">
                
        </div>`;

		// cached component JQueryfied element
		this.$el = $(template);
		console.log(this.$el);

		this.collection.forEach(item => this.$el.append(item.render()));
		console.log("debug:");
		console.log(this.$el);

		$('body').find('h2.list').after(this.$el);
	},
	create: function (ItemConstructor, fillItem, fillCasting) {
		var me = this;
		console.log("button created");
		button = $("button#submit");
		button.on("click", function (event) {
			console.log("click done");
			let item = fillItem();
			let casting = fillCasting();

			console.log("creation of : ", item);
			console.log("charactersId:", casting);

			fetch(this.path,
				{
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify(item)
				})
				.then(response => {
					response.json().then(json => {
						console.log(json);
						item = new ItemConstructor(json, me);
					})
						.then(response => {
							casting.forEach(id => {
								fetch(me.path + item.id + '/' + id, { method: "POST" });
							});
						})
						.then(response => { me.add(item) });
				})
		});
	},
	add: function (item) { //generique
		this.collection.push(item);
		this.$el.append(item.render());
		console.log(this.$el);
		return this.collection;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (ListComponent);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MovieItem */
function MovieItem(data, listComponent) { //generique
	Object.assign(this, data);
	this.listComponent = listComponent;
	this.collection = listComponent.collection;
	this.id = this.movie_id;
}

MovieItem.prototype = {
	render: function () {
		const template = `
            <div class="element"><a href="./${this.movie_title}.html">
                <div class="info">${this.movie_title}</div>
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
		console.log("delete movie " + this.movie_title);
		fetch("marvel/movies/" + this.movie_id, { method: "delete" }).catch(error => application());

		//remove ul
		component.movies = component.collection.filter(c => c.movie_id !== this.movie_id);
		this.$el.remove();
		console.log(this.$el);
		return this.$el;
	},
	modify: function () {
		const template = `
			<h2>MODIFY MOVIE ${this.movie_title}</h2>
			
			<form>
			<label>Title: <input type="text" name="title" required="required" value="${this.movie_title}></label><br/>
			<fieldset><legend>Characters in the movie</legend>
			</fieldset>
			<button type="button" id="submit">Create a new movie</button>
			</form>`;

	}

}

/* harmony default export */ __webpack_exports__["a"] = (MovieItem);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function render(item, collection) { //generique
    const template = `
        <div class="listing">
                
        </div>`;

    // cached component JQueryfied element
    let $el = $(template);
    console.log($el);

    collection.forEach(item => $el.append(item.render()));
    console.log("debug:");
    console.log($el);

    $('h2.list').after($el);

    return $el;
};

/* unused harmony default export */ var _unused_webpack_default_export = (render);

/***/ })
/******/ ]);