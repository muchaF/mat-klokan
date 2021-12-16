const menu = document.getElementById("login");
const elements = Array.from(document.getElementsByClassName("item"));
const base = menu.clientWidth;
var state = false
var width = 0;

window.onload = () => {   
     elements.forEach(element => {
          var margins = getComputedStyle(element)
          width += element.offsetWidth + parseInt(margins.marginLeft) + parseInt(margins.marginRight);
     });
     
     login.addEventListener("click", () => {
          if (!state) {
               state = true;
               menu.classList.add("stay");
               menu.style.setProperty("width", width + "px")
          }
     });

     document.addEventListener("click", (event)=>{
          if (!(event.target == menu || menu.contains(event.target))){
               console.log('close')
               state = false;
               menu.classList.remove("stay")
               menu.style.setProperty("width",base + "px")
          };
     });
     
     document.getElementById("logout").addEventListener("click",()=>{
          console.log("log-out");
     })
};
