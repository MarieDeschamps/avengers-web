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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export depthToString */
function depthToString(depth) {
    if (depth === 0) {
        return "./";
    }
    let result = "";
    for (let i = 0; i < depth; i++) {
        result = result + "../";
    }
    return result;
}

/* harmony default export */ __webpack_exports__["a"] = (depthToString);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__depthToString__ = __webpack_require__(0);
/* unused harmony export CharacterListComponent */


function CharacterListComponent(depth) {
	this.path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__depthToString__["a" /* default */])(depth)+"marvel/heroes";
}

CharacterListComponent.prototype = {
	fetchAll: function () {
		return $.get(this.path)
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

		$('body').find('h2.list').after(this.$el);
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

			fetch(this.path,
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
		fetch(this.path + this.id, { method: "delete" }).catch(error => application());

		//remove ul
		this.listComponent.characters = this.listComponent.collection.filter(c => c.id !== this.id);
		this.$el.remove();
		console.log(this.$el);
		return this.$el;
	}

}

/* harmony default export */ __webpack_exports__["a"] = (CharacterListComponent);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listComponent__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__movieItem__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__depthToString__ = __webpack_require__(0);
/* unused harmony export MovieListComponent */




function MovieListComponent(depth) {
	this.path = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__depthToString__["a" /* default */])(depth)+"marvel/movies";
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
}

MovieListComponent.prototype.render = __WEBPACK_IMPORTED_MODULE_0__listComponent__["a" /* default */].prototype.render;
MovieListComponent.prototype.add = __WEBPACK_IMPORTED_MODULE_0__listComponent__["a" /* default */].prototype.add;

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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__depthToString__ = __webpack_require__(0);
/* unused harmony export Template */


function Template(category, depth) {
    this.category = category;
    this.depth = depth;
}

Template.prototype = {
    template_head: function () {
        let depthString = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__depthToString__["a" /* default */])(this.depth);
        return `
            <meta charset="utf-8" content="text/html" />
            <link rel="stylesheet" href="${depthString}styles/tables.css" />
            <link rel="stylesheet" href="${depthString}styles/design.css" />
            <link rel="stylesheet" href="${depthString}styles/menu.css" />
            <title>Marvel - Home</title>
            `;
    },

    template_body: function () {
        let categoryUpper = this.category.toUpperCase();
        let categoryFirstLetterUpper = this.category.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
        let categoryLower = this.category.toLowerCase();
        return `
            <h1>MARVEL'S ${categoryUpper}</h1>
            <h2 class="list">${categoryFirstLetterUpper} list</h2>
            
            <h2>Create a new ${categoryLower}</h2>
            
            <form>
            
                <button type="button" id="submit">Create a new ${categoryLower}</button>
            </form>

            <footer>Built by Avengers Team ! - &copy;2017</footer>
            `;
    },

    template_header: function () {
        let depthString = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__depthToString__["a" /* default */])(this.depth);
        let template = `
            <nav>
                <ul>
                    <li id="logo"><a href="${depthString}/index.html" target="_blank"><img src="${depthString}/images/Marvel-logo.png" alt="Marvel Logo" /></a></li>`;
        if(this.category.toLowerCase()==="home"){
            template = template + `<li class="menu selected"><a href="${depthString}/index.html" class="menu_text">Home</a></li>`;
        }else{
            template = template + `<li class="menu"><a href="${depthString}/index.html" class="menu_text">Home</a></li>`;
        }
                    
        for(let cat of ["Character", "Team","Movie","Comics"]){
            if(this.category.toLowerCase()===cat.toLowerCase()){
            template = template + `<li class="menu selected"><a href="${depthString}/${cat}/${cat}List.html" class="menu_text">${cat}</a></li>`;
            }else{
                template = template + `<li class="menu"><a href="${depthString}/${cat}/${cat}List.html" class="menu_text">${cat}</a></li>`;
            }   
        }

        if(this.category.toLowerCase()==="shop"){
            template = template + `<li class="menu selected"><a href="${depthString}/Shop/Shop.html" class="menu_text">Shop</a></li>`;
        }else{
            template = template + `<li class="menu"><a href="${depthString}/Shop/Shop.html" class="menu_text">Shop</a></li>`;
        }        

        template = template + `         
                </ul>
            </nav>
            `;

        return template;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Template);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ListComponent */


function ListComponent(path){
	this.path = path
}

ListComponent.prototype = {
	getAll: function (path) {
		return $.get(this.path)
			.then(json => {
				this.collection = [];
				json.forEach(data => {
					this.collection.push(data);
				});

				return this.collection;
			});
	},
	render: function () {
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
	create: function () {
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__movieList_v2__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__characterList__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template_html__ = __webpack_require__(3);




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
	let characterList = new __WEBPACK_IMPORTED_MODULE_1__characterList__["a" /* default */](depth);
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
	let template = new __WEBPACK_IMPORTED_MODULE_2__template_html__["a" /* default */]("Movie",depth);
    
    $('head').append(template.template_head());
    $('header').append(template.template_header());
    $('body').append(template.template_body());

    $('button#submit').before(`<label>Title: <input type="text" name="title" required="required"></label><br/>
	<fieldset><legend>Characters in the movie</legend>
	</fieldset>`);

    let component = new __WEBPACK_IMPORTED_MODULE_0__movieList_v2__["a" /* default */](depth);
	component.fetchAndDisplay()

	characterListForMovie("create",null,depth);
});

/***/ }),
/* 6 */
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

/***/ })
/******/ ]);