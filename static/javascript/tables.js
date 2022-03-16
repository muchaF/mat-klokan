// generate tabels
// switch active tables
// sync data with server
var activeTable;

function renderTables(name, maxScore) {
    table.innerHTML = ''; // clearing table container
    let parent = document.createElement("div");
    parent.classList.add("activeTable")
    let nameNode = document.createElement("h1")
    parent.appendChild(nameNode);
    nameNode.textContent = name;

    let scoreParent = document.createElement("form");
    scoreParent.id = name;

    for (let s = 0; s < maxScore; s++) {
        let container = document.createElement("div");
        container.classList.add("fragment")
        container.innerHTML = "<p>" + (s + 1) + "</p><input name=" + s + " type='number' min='0'>"
        scoreParent.appendChild(container);
    }

    parent.appendChild(scoreParent);
    table.appendChild(parent);
}

let table = document.querySelector(".tables");

function updateTo(name) {
    pull(name).then((response) => {
        //set best player to table
        let players = document.querySelectorAll(".player");
        for (let player of players) player.remove();
        let playerTable = document.querySelector(".studentList")
        for (let player in response.best) {
            let values = response.best[player]
            console.log(values)
            let playerObject = document.createElement("tr")
            playerObject.classList.add("player")
            playerObject.innerHTML = "<td> <button onclick='removeRow(this)'>-</button> <td> <input type='text' value=" + values.name + "> </td> <td> <input type='text' value=" + values.surname + "> </td> <td> <input type='text' value=" + values.class + "> </td> <td><input type='date' value=" + values.birthday + "> </td></td> <td> <input type='number' value= " + values.score + "> </td> "
            playerTable.appendChild(playerObject)
        }
        document.querySelector(".best > h1").innerHTML = "Nejlepší řešitelé pro kategorii " + name;

        // display selected cetegory table
        renderTables(name, Object.keys(response.table).length);
        for (let key in response.table) 
            document.querySelector("input[name='" + key + "']").value = response.table[key]
        

        // highlight selected category
        for (var key in categoryObject) categoryObject[key].classList.remove("selected");
        categoryObject[name].classList.add("selected");
        updateCSS();
    })
}

function addPlayer() {
    let table = document.querySelector(".studentList")
    let row = document.createElement("tr");
    row.classList.add("player");
    row.innerHTML = "<td><button onclick='removeRow(this)'>Remove</button></td><td><input type='number'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='date'></td>"
    table.appendChild(row)
}

function removeRow(element) {
    element.parentElement.parentElement.remove()
}

updateTo("Cvrček")
activeTable = "Cvrček";

