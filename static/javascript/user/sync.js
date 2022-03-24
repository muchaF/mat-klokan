const conversion = { "Cvrček":"cvrcek",
                "Klokánek":"klokanek",
                "Benjamín":"benjamin",
                "Kadet":"kadet",
                "Junior":"junior",
                "Student":"student"}

function save(table) {
    // convert form to JSON format
    let form = document.querySelector("#" + table);
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
        data["best"][index]["name"]     = childNodes[0].value;
        data["best"][index]["surename"] = childNodes[1].value;
        data["best"][index]["grade"]    = childNodes[2].value;
        data["best"][index]["date"]     = childNodes[3].value;
        data["best"][index]["score"]    = childNodes[4].value;
        index++
    }

    // save formData to data dict
    for (let field of formData) {
        data["table"][field[0]] = field[1]
    }

    // send data to server
    let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
        // if (xhr.readyState === 4) {
            // loading and succes animation TBI
            // console.log(xhr.response);
            
        // }
    // }
    xhr.open("POST", "/API/sync", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

function pull(table) {
    return new Promise((resolve, reject) => {
        // synch data with server
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let response = JSON.parse(xhr.response);
                // console.log(response);
                resolve(response)
            }
        }
        argsString = "";
        args = {
            table: table
        };
        for (arg in args) {
            argsString += arg + "=" + args[arg] + '&'
        }
        xhr.open("GET", "/API/sync?" + argsString, true);
        xhr.send();
    })
}

document.querySelector(".save").addEventListener("click", () => {
    save(activeTable);
})