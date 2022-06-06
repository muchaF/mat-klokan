var activeTable;




function setTo(table) {
    pull(table).then((response) => {
        
        // Clearing table of previous data
        let solvers = document.querySelectorAll(".solver");
        for (let solver of solvers) solver.remove();
        
        // Add best solvers to coresponding table and empty field if none are presented
        let playerTable = document.querySelector(".studentList")
        for (let player in response.best) {
            addSolver(response.best[player])
        }        
        if (Object.keys(response.best).length == 0) addPlayer()

        // Display score - solver values
        addStats(table, Object.keys(response.table).length);
        for (let key in response.table){
            document.querySelector(`#${CSS.escape(key.toString())}`).innerHTML = response.table[key]
        }
        // highlight selected category
        for (var key in categoryObject) categoryObject[key].classList.remove("selected");
        categoryObject[table].classList.add("selected");
        
        let ico = document.querySelector("#save");
        for (let input of document.querySelectorAll("textarea")) {
            input.addEventListener("change",() => {
                sessionStorage.setItem(activeTable,JSON.stringify(fetchActiveTable()))
                ico.childNodes[1].src = "/static/img/svg/save.svg"
                ico.childNodes[3].innerHTML = "Uložit"
            })
        }
    })
}

function addStats(name, maxScore) {
    let scoreParent = document.querySelector("#category-statistic > form");
    scoreParent.innerHTML = ""
    scoreParent.id = name;
    let index = maxScore -1
    for (let row = 0; row < (maxScore) / columns; row++) {
        let rowdiv = document.createElement("div")
        for (let s = 0; s < columns; s++) {
            if (index >= 0) {
                let container = document.createElement("div");
                container.classList.add("fragment")
                container.innerHTML = `<p>${index}</p><textarea id=${index} type='number' min='0'></textarea>`
                rowdiv.appendChild(container);
                index --;
            }
        }
        scoreParent.appendChild(rowdiv)
    }
}

function addSolver(student) {
    let table = document.querySelector("#results")
    let row = document.createElement("tr");
    row.classList.add("solver");

    if (student != null){
        row.innerHTML = `
        <td> <textarea type='text' placeholder='jméno'>${student.name}</textarea></td>
        <td> <textarea placeholder='přijmení' type='text'>${student.surname}</textarea></td>
        <td> <textarea placeholder='třída' type='text'>${student.class}</textarea></td>
        <td> <textarea type='date' placeholder='datum'>${student.birthday}</textarea></td>
        <td class='score'> 
            <textarea placeholder='skóre' min='0' value='0'>${student.score}</textarea><img src='/static/img/svg/remove.svg' onclick='decrement(this)' >
            <img src='/static/img/svg/add.svg' onclick='add(this)'> 
        </td>
        <td> <img class='trash' onclick='removeRow(this)' src='/static/img/svg/delete.svg'> </td>`
    }
    else{
        row.innerHTML = `
        <td> <textarea type='text' placeholder='jméno'></textarea></td>
        <td> <textarea placeholder='přijmení' type='text'></textarea></td>
        <td> <textarea placeholder='třída' type='text'></textarea></td>
        <td> <textarea type='date' placeholder='datum'></textarea></td>
        <td class='score'> 
            <textarea placeholder='skóre' min='0' value='0'></textarea><img src='/static/img/svg/remove.svg' onclick='decrement(this)' >
            <img src='/static/img/svg/add.svg' onclick='add(this)'> 
        </td>
        <td> <img class='trash' onclick='removeRow(this)' src='/static/img/svg/delete.svg'></td>`        
    }

    let saveButton = document.querySelector("#save");
    for (let textarea of row.querySelectorAll("textarea")) {
        textarea.addEventListener("change",() => {
            sessionStorage.setItem(activeTable,JSON.stringify(fetchActiveTable()))
            saveButton.childNodes[1].src = "/static/img/svg/save.svg"
            saveButton.childNodes[3].innerHTML = "Uložit"
        })
    }
    table.appendChild(row)

    // Mozna performance issue
}

function removeRow(element) {
    element.parentElement.parentElement.remove()
    if (document.querySelectorAll(".solver").length == 0) addPlayer();
}


function add(element) {
    element.parentNode.querySelector('input[type=number]').stepUp();
}


function decrement(element) {
    element.parentNode.querySelector('input[type=number]').stepDown();
}


setTo("Cvrček")
activeTable = "Cvrček";