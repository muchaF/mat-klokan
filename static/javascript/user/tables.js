var activeTable;

function renderTables(name, maxScore) {
    let nameNode = document.querySelector('.scoreName')
    nameNode.innerHTML = name;

    let scoreParent = document.querySelector(".scoreForm");
    scoreParent.innerHTML = ""
    scoreParent.onchange = () => {
        save(activeTable);
    }
    scoreParent.id = name;
    for (let s = 120; s >= 0; s--) {
        let container = document.createElement("div");
        container.classList.add("fragment")
        container.innerHTML = "<p>" + (s) + "</p><input name=" + s + " type='number' min='0'>"
        scoreParent.appendChild(container);
    }
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
            // console.log(values)
            let playerObject = document.createElement("tr")
            playerObject.classList.add("player")
            playerObject.innerHTML = "<td> <button onclick='removeRow(this)'> <img src='/static/img/svg/delete.svg'> </button> <td> <input type='text' value=" + values.name + "> </td> <td> <input type='text' value=" + values.surname + "> </td> <td> <input type='text' value=" + values.class + "> </td> <td><input type='date' value=" + values.birthday + "> </td></td> <td> <input type='number' value= " + values.score + "> </td> "
            playerTable.appendChild(playerObject)
        }
        document.querySelector(".best > h1").innerHTML = "Nejlepší řešitelé pro kategorii " + name;

        // display selected cetegory table
        renderTables(name, Object.keys(response.table).length);
        // console.log(response.table);
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
    row.innerHTML = "<td> <button onclick='removeRow(this)'><img src='/static/img/svg/delete.svg'></button> <td> <input type='text'> </td> <td> <input type='text'> </td> <td> <input type='text'> </td> <td><input type='date'> </td></td> <td> <input type='number'> </td> "
    table.appendChild(row)
}

function removeRow(element) {
    element.parentElement.parentElement.remove()
}

updateTo("Cvrček")
activeTable = "Cvrček";

