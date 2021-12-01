const size = 10;

loadData("/getForm")
function loadData(url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4) generateTable(request.responseText);
    }

    request.open('GET', url, true);
    request.send('');
    return request;
}

function generateTable(formFill = null) {
    var form = document.createElement("form");
    form.id = "scores";

    document.body.appendChild(form);
    for (let i = 1; i <= size; i++) {
        let cell = document.createElement("div");
        let index = document.createElement("p");
        let input = document.createElement("input");

        input.type = "text";
        input.name = i;
        input.id = i;
        index.textContent = i;
        index.classList.add("number");
        input.classList.add("score");
        cell.classList.add("container");

        cell.appendChild(index);
        cell.appendChild(input);
        form.appendChild(cell);
    }

    var save = document.createElement("input");
    save.type = "submit"
    form.appendChild(save);
    document.body.appendChild(form);
    document.getElementById("scores").addEventListener("submit", formSubmit);
    fillForm(formFill);
}

function fillForm(data) {
    let jsonFill = JSON.parse(data)
    for (var key in jsonFill) {
        try {
            document.getElementById(key).value = jsonFill[key]
        } catch (error) {
            console.log("if not found | index overflow")
        }
    }
}

// preventing redirect on submit
function formSubmit(event) {
    var url = "/submit";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onerror = function () {
        alert("chyba pri spojeni se serverem")
    };
    request.send(new FormData(event.target));
    event.preventDefault();
}