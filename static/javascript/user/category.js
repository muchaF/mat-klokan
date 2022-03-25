const category = ["Cvrček",
                  "Klokánek",
                  "Benjamín",
                  "Kadet",
                  "Junior",
                  "Student"]

const years = document.querySelectorAll(".category-container")
var categoryObject = new Object();
var loading = false

function fillYear(year){
     for (let catIndex = 0; catIndex < category.length; catIndex++) {
          var cat = document.createElement("div");
          cat.textContent = category[catIndex];
          cat.classList.add("category");
          // updating table to
          cat.addEventListener("click",() => {
               save()
               console.log("updating....")
               loading = false;
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