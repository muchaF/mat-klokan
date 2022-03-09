// generate tabels
// switch active tables
// sync data with server

let target = document.querySelector(".tables")
var activeTable;

function renderTables(name, maxScore) {
    let parent = document.createElement("div");
    parent.classList.add("activeTable")
    let nameNode = document.createElement("h1")
    nameNode.textContent = name;
    parent.appendChild(nameNode);

    let scoreParent = document.createElement("form");
    for (let s = 0; s < maxScore; s++) {
        let container = document.createElement("div");
        container.classList.add("fragment")
        container.innerHTML = "<p>" + (s+1) + "</p><input type='number' min='0'>"
        scoreParent.appendChild(container);
    }
    
    parent.appendChild(scoreParent);
    return parent
}

function updateTo(name){
    target.innerHTML = '';
    target.appendChild(renderTables(name,150));
    console.log(categoryObject[name]);
    for (var key in categoryObject){
        categoryObject[key].classList.remove("selected");    
    }    
    categoryObject[name].classList.add("selected");
    updateCSS();
}

target.appendChild(renderTables("header",150))