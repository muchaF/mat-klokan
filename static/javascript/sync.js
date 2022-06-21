const conversion = {
    "Cvrček": "cvrcek",
    "Klokánek": "klokanek",
    "Benjamín": "benjamin",
    "Kadet": "kadet",
    "Junior": "junior",
    "Student": "student"
}

function parsePrevent(number){
    if (isNaN(parseInt(number))) return 0
    else return parseInt(number)
}


function fetchActiveTable(){
    // convert form to JSON
    let data = {
        category: conversion[activeTable],
        best: {},
        table: {}
    };

    let index = 0
    for (let player of document.querySelectorAll(".solver")) {
        let childNodes = player.querySelectorAll('textarea');
        data.best[index] = {};
        data.best[index]["name"] = childNodes[0].value;
        data.best[index]["surname"] = childNodes[1].value;
        data.best[index]["grade"] = childNodes[2].value;
        data.best[index]["date"] = childNodes[3].value;
        data.best[index]["score"] = parsePrevent(childNodes[4].value);
        index++   
    }

    let entries = document.querySelectorAll('.fragment > textarea')
    for (let entry of entries) {
        data.table[entry.id] = entry.innerHTML
    }

    return data
}


function save(pushToServer) {
    // send data to server
    console.log(`pushing ${activeTable}`)
    sessionStorage.setItem(activeTable,JSON.stringify(fetchActiveTable()))

    if(pushToServer){
        let saveButton = document.querySelector("#save")
        saveButton.childNodes[1].src = "/static/img/svg/done_white_24dp.svg"
        saveButton.childNodes[3].innerHTML = "Uloženo"
        // return 
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/API/sync", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(fetchActiveTable()));
    }
}


function pull(table) {
    return new Promise((resolve, reject) => {
        // getting table data from sessionStorage
        console.log(`pulling ${table}`)
        if (sessionStorage.getItem(table) != null){
            console.log(`load from cash`)
            resolve(JSON.parse(sessionStorage.getItem(table)))
            return
        }
        // downloading data from server
        else { 
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    let response = JSON.parse(xhr.response);
                    sessionStorage.setItem(table,JSON.stringify(response))
                    resolve(response)
                }
            }
            argsString = "";
            args = { table: conversion[table] };
            for (arg in args) argsString += arg + "=" + args[arg] + '&'

            xhr.open("GET", "/API/sync?" + argsString, true);
            xhr.send();
        }
    })
}


function getExport(){
    save();
    window.location.href = "/API/export";
}