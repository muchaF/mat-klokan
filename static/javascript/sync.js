function save(table) {
    // convert form to JSON format
    let form = document.querySelector("#" + table);
    let formData = new FormData(form);
    let data = {};
    for (let field of formData) {
        data[field[0]] = field[1]
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

            for (key in response) {
                document.querySelector("input[name='" + key + "']").value = response[key];
            }
        }
    }
    argsString = "";
    args = {
        length: document.querySelector("#"+table).childElementCount,
        user: "adming",
        table: "Cvrček"
    };
    for (arg in args) {
        console.log(arg)
        argsString += arg + "=" + args[arg] + '&'
    }
    xhr.open("GET", "/API/sync?" + argsString, true);
    xhr.send();
}

document.querySelector(".save").addEventListener("click", () => {
    // save(activeTable);
    sync(activeTable);
})