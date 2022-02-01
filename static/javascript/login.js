const patters =/\w+\@\w+\.\w+/gm
function validEmail(email){
     if(email.search(patters) != -1){
          return true;
     }
     return false;
}

document.querySelector("#form").addEventListener("submit", (e) => {
     e.preventDefault();
     console.log("ss");
     document.querySelector
})

validEmail("@ds.cs");