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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = CharacterListComponent;
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

/* unused harmony default export */ var _unused_webpack_default_export = (CharacterListComponent);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__characterList__ = __webpack_require__(0);


$(document).ready(function(){
	let component = new __WEBPACK_IMPORTED_MODULE_0__characterList__["a" /* CharacterListComponent */]();
	component.fetchAll().then(component.render.bind(component));
	component.create();
});

/***/ })
/******/ ]);