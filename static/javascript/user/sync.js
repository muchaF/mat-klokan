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


function fetchData(){
    // convert form to JSON
    let form = document.querySelector("#" + activeTable);
    let formData = new FormData(form);

    let data = {
        category: conversion[activeTable],
        best: {},
        table: {}
    };

    let index = 0
    for (let player of document.querySelectorAll(".player")) {
        let childNodes = player.querySelectorAll('input');
        data["best"][index] = {};
        data["best"][index]["name"] = childNodes[0].value;
        data["best"][index]["surname"] = childNodes[1].value;
        data["best"][index]["grade"] = childNodes[2].value;
        data["best"][index]["date"] = childNodes[3].value;
        data["best"][index]["score"] = parsePrevent(childNodes[4].value);
        index++
    }

    // save formData to data dict
    for (let field of formData) data["table"][field[0]] = parsePrevent(field[1])
    return data
}


function save() {
    sessionStorage.setItem(activeTable,JSON.stringify(fetchData()))
    // send data to server
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/API/sync", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(fetchData()));
}


function pull(table) {
    return new Promise((resolve, reject) => {
        if (sessionStorage.getItem(table) != null){
            console.log("cache load")
            resolve(JSON.parse(sessionStorage.getItem(table)))
        }
        else {
            // synch data with server
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    console.log("call load")
                    let response = JSON.parse(xhr.response);
                    sessionStorage.setItem(table,JSON.stringify(response))
                    resolve(response)
                }
            }
            argsString = "";
            args = {
                table: conversion[table]
            };

            for (arg in args) {
                argsString += arg + "=" + args[arg] + '&'
            }

            xhr.open("GET", "/API/sync?" + argsString, true);
            xhr.send();
        }
    })
}


function getExport(){
    save();
    window.location.href = "/API/export";
}


document.querySelector(".save").addEventListener("click", () => {save();})