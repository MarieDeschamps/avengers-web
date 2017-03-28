interface Avenger {
    nom: string;
    description: string;
}

let a: Avenger;
a = {
    nom: "toto",
    description: "I am toto"
}

class MovieComponent{
    constructor(private title: string){ // crée un champ privé title de type string qui contient la valeur du parametre title
    }
    affiche(){
        console.log(this.title);
    }
}

console.log(a.description);
let m = new MovieComponent('Avengers');
m.affiche();

class B extends MovieComponent{
    toto(){
        
    }
}