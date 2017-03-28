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

export default render;