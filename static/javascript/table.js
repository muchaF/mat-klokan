const size = 10;

function getPage(url, type, process) {
    var url = "/getForm";
    var request = new XMLHttpRequest();
    if (process) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                process()
            }
        }    
    }
    else {
        request.timeout = 4000;
    }

    request.open('GET', url, true);
    request.send('');
    return request;
}

var form = document.createElement("form");
form.id = "scores";



for (let i = 1; i <= size; i++) {
    let cell = document.createElement("div");
    let index = document.createElement("p");
    let input = document.createElement("input");

    let test = document.createElement("a");

    input.type = "text";
    input.name = i;
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

// preventing redirect on submit
function formSubmit(event) {
    console.log("submitting!")
    var url = "/submit";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);

    request.onerror = function () {
        alert("error")
    };

    request.send(new FormData(event.target));
    console.log(request.response);
    event.preventDefault();
}


document.getElementById("scores").addEventListener("submit", formSubmit);