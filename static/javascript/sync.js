function save(table) {
    // convert form to JSON format
    let form = document.querySelector("#" + table);
    let formData = new FormData(form);
    
    let data = {
        user:currentUser,
        category:activeTable,
        best:{},
        table:{}
    };
    
    let index = 0
    for (let player of document.querySelectorAll(".player")) {
        let childNodes = player.querySelectorAll('input');
        data["best"][index] = {};
        data["best"][index]["score"] = childNodes[0].value;
        data["best"][index]["name"] = childNodes[1].value;
        data["best"][index]["surename"] = childNodes[2].value;
        data["best"][index]["class"] = childNodes[3].value;
        data["best"][index]["birthday"] = childNodes[4].value;
        index++        
    }
    
    // save formData to data dict
    for (let field of formData) {
        data["table"][field[0]] = field[1]
    }
    
    // send data to server
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // loading and succes animation TBI
            console.log(xhr.response);
        }
    }
    xhr.open("POST", "/API/sync", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

function sync(table) {
    // synch data with server
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.response)
            let response = JSON.parse(xhr.response);

            for (key in response["table"]) {
                document.querySelector("input[name='" + key + "']").value = response["table"][key];
            }
        }
    }
    argsString = "";
    args = {
        length: document.querySelector("#"+table).childElementCount,
        user: currentUser,
        table: activeTable
    };
    console.log(args)
    for (arg in args) {
        argsString += arg + "=" + args[arg] + '&'
    }
    xhr.open("GET", "/API/sync?" + argsString, true);
    xhr.send();
}

document.querySelector(".save").addEventListener("click", () => {
    save(activeTable);
    // sync(activeTable);
})