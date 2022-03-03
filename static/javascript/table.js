
const category = ["Cvrček",
                  "Klokánek",
                  "Benjamín",
                  "Kadet",
                  "Junior",
                  "Student"]

const years = document.querySelectorAll(".category-container")
console.log(years)

function fillYear(year){
     for (let catIndex = 0; catIndex < category.length; catIndex++) {
          var cat = document.createElement("div");
          cat.textContent = category[catIndex];
          cat.classList.add("cetegory");
          year.appendChild(cat);
     }
}

years.forEach(year => {
     fillYear(year);
});