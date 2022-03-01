
const category = ["Cvrček",
                  "Klokánek",
                  "Benjamín",
                  "Kadet",
                  "Junior",
                  "Student"]

const target = document.querySelector(".table-container");

function generateTable(name, score) {
     let table = document.createElement("form");
     for (let e = 0; e < score; e++) {
          var scoreValue = document.createElement("p") 
          var input = document.createElement("input")
          scoreValue.textContent = e.toString();
          table.appendChild(scoreValue);
          table.appendChild(input);
     }
     table.classList.add("table")
     target.appendChild(table);
}

category.forEach(element => {
     generateTable(element,20);
});