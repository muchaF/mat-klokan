
const category = ["Cvrček",
                  "Klokánek",
                  "Benjamín",
                  "Kadet",
                  "Junior",
                  "Student"]

const years = document.querySelectorAll(".category-container")
console.log(years)
var categoryObject = new Object();

function fillYear(year){
     for (let catIndex = 0; catIndex < category.length; catIndex++) {
          var cat = document.createElement("div");
          cat.textContent = category[catIndex];
          cat.classList.add("cetegory");
          // updating table to
          cat.addEventListener("click",() => {
               updateTo(category[catIndex]);
               activeTable = category[catIndex];
          });
          
          categoryObject[category[catIndex]] = cat;
          year.appendChild(cat);
     }
}

years.forEach(year => {
     fillYear(year);
});