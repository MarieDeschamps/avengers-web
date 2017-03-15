function fetch(){

}

window.onload = function(){
    button = document.querySelector("button#submit");
    button.addEventListener("click", function(event){
        const hero = {
        alias : document.getElementsByName("alias").item(0).value,
        realName : document.getElementsByName("realName").item(0).value,
        abilities : document.getElementsByName("abilities").item(0).value
    }
    fetch('marvel/heroes',{hero}, {method:'post'});
    });
}