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
var a;
a = {
    nom: "toto",
    description: "I am toto"
};
var MovieComponent = (function () {
    function MovieComponent(title) {
        this.title = title;
    }
    MovieComponent.prototype.affiche = function () {
        console.log(this.title);
    };
    return MovieComponent;
}());
console.log(a.description);
var m = new MovieComponent('Avengers');
m.affiche();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.toto = function () {
    };
    return B;
}(MovieComponent));
