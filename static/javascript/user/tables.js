var activeTable;

function renderTables(name, maxScore) {
    let nameNode = document.querySelector('.scoreName')
    nameNode.innerHTML = name;

    let scoreParent = document.querySelector(".scoreForm");
    scoreParent.innerHTML = ""
    scoreParent.onchange = save(activeTable);
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
            playerObject.innerHTML = "<td> <input type='text' value=" + values.name + "> </td> <td> <input type='text' value=" + values.surname + "> </td> <td> <input type='text' value=" + values.grade + "> </td> <td class='sample'><input type='date' value=" + values.date + "> </td></td> <td class='scinput'><input type='number' min='0' value= " + values.score + "><img src='/static/img/svg/remove.svg' onclick='decrement(this)' ><img src='/static/img/svg/add.svg' onclick='add(this)' class='plus'> </td> <td> <img onclick='removeRow(this)' onload='updateCSS()' src='/static/img/svg/delete.svg'></td>"
            playerTable.appendChild(playerObject)
        }
        document.querySelector(".best-head").innerHTML = "Nejlepší řešitelé pro kategorii " + name;

        // display selected cetegory table
        renderTables(name, Object.keys(response.table).length);
        // console.log(response.table);
        for (let key in response.table) 
            document.querySelector("input[name='" + key + "']").value = response.table[key]
        
        // highlight selected category
        for (var key in categoryObject) categoryObject[key].classList.remove("selected");
        categoryObject[name].classList.add("selected");
    })
}

function addPlayer() {
    let table = document.querySelector(".studentList")
    let row = document.createElement("tr");
    row.classList.add("player");
    // row.innerHTML = "<td><input type='text'> </td> <td> <input type='text'> </td> <td> <input type='text'> </td> <td><input type='date'> </td></td> <td> <input type='number'> </td> <td> <img onclick='removeRow(this)' onload='updateCSS()' src='/static/img/svg/delete.svg'></td>"
    row.innerHTML = "<td><input type='text' placeholder='jméno'> </td> <td> <input placeholder='přijmení' type='text'> </td> <td> <input placeholder='třída' type='text'> </td> <td class='sample'><input type='date' placeholder='datum'> </td></td> <td class='scinput'> <input placeholder='skóre' min='0' value='0' type='number'><img src='/static/img/svg/remove.svg' onclick='decrement(this)' ><img src='/static/img/svg/add.svg' onclick='add(this)' class='plus'> </td> <td> <img onclick='removeRow(this)' onload='updateCSS()' src='/static/img/svg/delete.svg'></td>"
    table.appendChild(row)
}

function IChange(target) {
    // console.log(target)
    // console.log(target.childNodes)
    target.childNodes[1].src = "/static/img/svg/done_white_24dp.svg"
    target.childNodes[3].innerHTML = "Uloženo"
    // return
}

function removeRow(element) {
    element.parentElement.parentElement.remove()
}

function add(element){
    element.parentNode.querySelector('input[type=number]').stepUp();
}
function decrement(element){
    element.parentNode.querySelector('input[type=number]').stepDown();
}

updateTo("Cvrček")
activeTable = "Cvrček";

