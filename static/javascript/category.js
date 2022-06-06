const categoryDict = ["Cvrček",
     "Klokánek",
     "Benjamín",
     "Kadet",
     "Junior",
     "Student"]

var categoryObject = new Object();


function fillYear(year) {
     for (let item of categoryDict) {
          var category = document.createElement("a");
          category.innerHTML = `<p>${item}</p>`;
          category.classList.add("category");
          category.classList.add('button')
          // updating table to
          category.addEventListener("click", () => {
               save()
               setTo(item);
               activeTable = item;
          });

          categoryObject[item] = category;
          year.appendChild(category);
     }
}


document.querySelectorAll("#category-container").forEach(year => {
     fillYear(year);
});