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
 
function updateTo(name){
    target.innerHTML = '';
    target.appendChild(renderTables(name,120));


    for (var key in categoryObject){
        categoryObject[key].classList.remove("selected");    
    }    
    categoryObject[name].classList.add("selected");
    updateCSS();
}

function addPlayer(){
    let table = document.querySelector(".studentList")
    let row = document.createElement("tr");
    row.innerHTML = "<td><button onclick='removeRow(this)'>Remove</button></td><td>name</td>"
    table.appendChild(row)
}

function removeRow(element){
    element.parentElement.parentElement.remove()
}


// default load
updateTo("Cvrček")
activeTable = "Cvrček";

