// generate tabels
// switch active tables
// sync data with server
var activeTable;

function renderTables(name, maxScore) {
    let parent = document.createElement("div");
    parent.classList.add("activeTable")
    let nameNode = document.createElement("h1")
    nameNode.textContent = name;
    parent.appendChild(nameNode);
    
    let scoreParent = document.createElement("form");
    scoreParent.id = name;

    for (let s = 0; s < maxScore; s++) {
        let container = document.createElement("div");
        container.classList.add("fragment")
        container.innerHTML = "<p>" + (s+1) + "</p><input name="+s+" type='number' min='0'>"
        scoreParent.appendChild(container);
    }
    
    parent.appendChild(scoreParent);
    return parent
}
 
let table = document.querySelector(".tables");
function updateTo(name){
    let players = document.querySelectorAll(".player");
    table.innerHTML = '';
    table.appendChild(renderTables(name,120));
    for (var key in categoryObject){
        categoryObject[key].classList.remove("selected");    
    }    
    for (let player of players) {
        player.remove();
    }

    categoryObject[name].classList.add("selected");
    document.querySelector(".best > h1").innerHTML = "Nejlepší řešitelé pro kategorii " + name;
    updateCSS();
}

function addPlayer(){
    let table = document.querySelector(".studentList")
    let row = document.createElement("tr");
    row.classList.add("player");
    row.innerHTML = "<td><button onclick='removeRow(this)'>Remove</button></td><td><input type='number'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='date'></td>"
    table.appendChild(row)
}

function removeRow(element){
    element.parentElement.parentElement.remove()
}


// default load
updateTo("Cvrček")
activeTable = "Cvrček";

