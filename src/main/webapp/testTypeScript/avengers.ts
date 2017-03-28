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

/*compiler ts avec console (>tsc avengers.ts) pour avoir le fichier avengers.js*/


class MovieComponent {
    constructor(private title: string /*raccourci la declaration + implementation*/) {
        //this.title = title;
    }

    display() {
        console.log(this.title);
    }

    //private title:string;
}

let m = new MovieComponent('Avengers');
m.display();

class B extends MovieComponent{
    toto(){
        
    }
}