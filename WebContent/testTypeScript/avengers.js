/*interface Avenger {
    nom: string;
    description: string;
}

let a:Avenger;
a={
    nom: "titu",
    description:"ceci est un test",
}

console.log(a.nom);*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*compiler ts avec console (>tsc avengers.ts) pour avoir le fichier avengers.js*/
var MovieComponent = (function () {
    function MovieComponent(title /*raccourci la declaration + implementation*/) {
        this.title = title; /*raccourci la declaration + implementation*/
        //this.title = title;
    }
    MovieComponent.prototype.display = function () {
        console.log(this.title);
    };
    return MovieComponent;
}());
var m = new MovieComponent('Avengers');
m.display();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.toto = function () {
    };
    return B;
}(MovieComponent));
