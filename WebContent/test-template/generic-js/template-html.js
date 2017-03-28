import depthToString from './depthToString';

export function Template(category, depth) {
    this.category = category;
    this.depth = depth;
}

Template.prototype = {
    template_head: function () {
        let depthString = depthToString(this.depth);
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
        let depthString = depthToString(this.depth);
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

export default Template;