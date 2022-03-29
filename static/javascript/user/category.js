const categoryDict = ["Cvrček",
     "Klokánek",
     "Benjamín",
     "Kadet",
     "Junior",
     "Student"]

var categoryObject = new Object();


function fillYear(year) {
     for (let item of categoryDict) {
          var category = document.createElement("div");
          category.textContent = item;
          category.classList.add("category");
          // updating table to
          category.addEventListener("click", () => {
               save()
               console.log("updating....")
               updateTo(item);
               activeTable = item;
          });

          categoryObject[item] = category;
          year.appendChild(category);
     }
}


document.querySelectorAll(".category-container").forEach(year => {
     fillYear(year);
});