function addElement(obj,elementID){
     var parent = document.createElement("div")
     parent.classList.add("user-input");

     var child1 = document.createElement("p") 
     var child2 = document.createElement("input")

     child1.textContent = elementID.toString();
     child1.classList.add("table-element");
     child2.classList.add("table-element");

     parent.appendChild(child1);
     parent.appendChild(child2);

     obj.appendChild(parent)
}


const table = document.querySelector("form");
for (let i = 0; i < 25; i++) {
     addElement(table,i);     
}