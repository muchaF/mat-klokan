function save(table){
    // convert form to JSON format
    let form = document.querySelector("#"+table);
    let formData = new FormData(form);
    let data = {};
    for(let field of formData) {
        data[field[0]] = field[1]
    }

    // send data to server
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            // loading and succes animation TBI
            console.log(xhr.response);
        }
    }
    xhr.open("POST","/API/sync",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

document.querySelector(".save").addEventListener("click",() => {
    save(activeTable);
})