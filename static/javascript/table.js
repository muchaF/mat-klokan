
const category = ["Cvrček",
                  "Klokánek",
                  "Benjamín",
                  "Kadet",
                  "Junior",
                  "Student"]

const target = document.querySelector(".table-container");

function generateTable(name, score) {
     let table = document.createElement("form");
     let header = document.createElement("h2");
     header.textContent = name;
     table.appendChild(header);


     let inputContainer = document.createElement("div");
     for (let e = 0; e < score; e++) {
          let row = document.createElement("div");
          var scoreValue = document.createElement("p");
          var input = document.createElement("input");
          input.type = "number"
          scoreValue.textContent = e.toString();
          row.appendChild(scoreValue);
          row.appendChild(input);
          inputContainer.appendChild(row);
     }

     table.classList.add("table")
     table.appendChild(inputContainer);
     target.appendChild(table);
}

// category.forEach(element => {
//      generateTable(element,120);
// });
generateTable("element",120);